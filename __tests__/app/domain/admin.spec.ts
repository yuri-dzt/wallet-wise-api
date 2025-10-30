import { describe, expect, it } from "vitest";

import { Admin } from "../../../src/domain/entities/admin";

describe('Admin', () => {
  describe('create', () => {
    it('should be able to create a admin without passing id', () => {
      const admin = new Admin({
        name: 'John Doe',
        email: '5oB3O@example.com',
        permission: 1,
        password: '123456',
      })

      expect(admin).toBeInstanceOf(Admin)
      expect(admin.name).toEqual('John Doe')
      expect(admin.email).toEqual('5oB3O@example.com')
      expect(admin.password).toEqual('123456')
    })

    it('should be able to create a admin passing id', () => {
      const admin = new Admin({
        id: '1',
        name: 'John Doe',
        email: '5oB3O@example.com',
        permission: 1,
        password: '123456',
      })

      expect(admin).toBeInstanceOf(Admin)
      expect(admin.id).toEqual('1')
      expect(admin.name).toEqual('John Doe')
      expect(admin.email).toEqual('5oB3O@example.com')
      expect(admin.password).toEqual('123456')
    })
  })

  describe('update', () => {
    it('should be able to update a admin', () => {
      const admin = new Admin({
        id: '1',
        name: 'John Doe',
        email: '5oB3O@example.com',
        permission: 1,
        password: '123456',
      })

      admin.updateName('John Doe 2')
      admin.updateEmail('johndoe@example.com')
      admin.updatePassword('654321')

      expect(admin.id).toEqual('1')
      expect(admin.name).toEqual('John Doe 2')
      expect(admin.email).toEqual('johndoe@example.com')
      expect(admin.password).toEqual('654321')
    })
  })
})