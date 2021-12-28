const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./index');

chai.use(chaiHttp)

describe('Probando API REST "Club Deportivo" con Mocha - Chai', () => {
  it('Verificar que la ruta /deportes devuelve un JSON con la propiedad deportes y esta es un arreglo', () => {
    chai
      .request(server)
      .get('/deportes')
      .end((err, res) => {
        let data = JSON.parse(res.text)
        chai.expect(data).to.have.property('deportes')
        chai.expect(data.deportes).to.be.an('array')
      })
  })
})