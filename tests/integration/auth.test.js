const request = require('supertest')
const bcrypt = require('bcrypt')
const { User } = require('../../models/user')
let server

describe('/api', () => {
  beforeEach(() => { server = require('../../index') })
  afterEach(async () => {
    server.close()
    await User.deleteMany({})
  })

  describe('/login', () => {
    let email
    let password

    beforeEach(() => {
      email = 'ediboghian@yahoo.com',
        password = '12341234'
    })

    const exec = async () => {
      const salt = await bcrypt.genSalt(10)
      await User.collection.insertMany([
        {
          email: 'ediboghian@yahoo.com',
          password: await bcrypt.hash('12341234', salt),
          username: 'edi',
          phoneNumber: '0722222',
          location: 'Galati, Galati'
        }
      ])
      return request(server)
        .post('/api/login')
        .send({
          email,
          password
        })
    }

    it('should return 200 if the data is valid', async () => {
      let res = await exec()

      expect(res.status).toBe(200)
    })

    it('should return 400 if the email is not valid', async () => {
      email = ''
      let res = await exec()

      expect(res.status).toBe(400)
    })

    it('should return 400 if the password is not valid', async () => {
      password = ''
      let res = await exec()

      expect(res.status).toBe(400)
    })
  })

  describe('/register', () => {
    it('should save the new user and return 200', async () => {
      let res = await request(server)
        .post('/api/register')
        .send({
          userData: {
            firstName: 'marian',
            lastName: 'test',
            email: 'ediboghian@yahoo.com',
            password: '12341234',
            phoneNumber: '07220186000',
            location: 'Galati, Galati'
          }
        })

      expect(res.status).toBe(200)
      expect(res.body.username).toMatch('marian test')
    })

    it('should return 400 if the email already exists', async () => {
      const salt = await bcrypt.genSalt(10)
      await User.collection.insertMany([
        {
          email: 'marian@yahoo.com',
          password: await bcrypt.hash('12341234', salt)
        }
      ])

      let res = await request(server)
        .post('/api/register')
        .send({
          userData: {
            email: 'marian@yahoo.com'
          }
        })

      expect(res.status).toBe(400)
    })
  })
})