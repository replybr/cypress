const fs = require('fs')
const path = require('path')
const e2e = require('../support/helpers/e2e').default
const Fixtures = require('../support/helpers/fixtures')

describe('e2e config', () => {
  e2e.setup()

  it('provides various environment details', function () {
    return e2e.exec(this, {
      spec: 'config_passing_spec.js',
      snapshot: true,
      config: {
        env: {
          scriptlet: '<script>alert(\'this should not break\')</script>',
        },
      },
    })
  })

  it('applies defaultCommandTimeout globally', function () {
    return e2e.exec(this, {
      project: Fixtures.projectPath('config-with-short-timeout'),
      snapshot: true,
      expectedExitCode: 1,
    })
  })

  // TODO: test that environment variables and CYPRESS_config work as well

  it('throws error when invalid viewportWidth in the configuration file', function () {
    return e2e.exec(this, {
      project: Fixtures.projectPath('config-with-invalid-viewport'),
      expectedExitCode: 1,
      snapshot: true,
    })
  })

  it('throws error when invalid browser in the configuration file', function () {
    return e2e.exec(this, {
      project: Fixtures.projectPath('config-with-invalid-browser'),
      expectedExitCode: 1,
      snapshot: true,
    })
  })

  it('supports global shadow dom inclusion', function () {
    return e2e.exec(this, {
      project: Fixtures.projectPath('shadow-dom-global-inclusion'),
    })
  })

  it('does not create a cypress.json when `module.exports = {}` is the only thing in cypress.config.js', function () {
    const project = Fixtures.projectPath('config-with-empty-cypress-config')

    return e2e.exec(this, {
      project,
    }).then(() => {
      expect(fs.existsSync(path.resolve(project, 'cypress.json'))).to.be.false
    })
  })

  it('does not crash when `module.exports = {}` is the only thing in cypress.config.js and there is a cypress.json', function () {
    const project = Fixtures.projectPath('config-with-json-and-empty-cypress-config')

    return e2e.exec(this, {
      project,
    })
  })
})
