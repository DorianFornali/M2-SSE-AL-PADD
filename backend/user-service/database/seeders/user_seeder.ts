import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '../../app/models/user.js'
import { ROLES } from '../../app/enums/roles.js'

export default class extends BaseSeeder {
  public async run() {
    const unique = 'email'

    await User.updateOrCreateMany(unique, [
      // Doctors
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@hospital.com',
        password: 'password123',
        phoneNumber: '1234567890',
        address: '123 Doctor Street',
        birthDate: '1980-04-12',
        role: ROLES.DOCTOR,
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@hospital.com',
        password: 'password123',
        phoneNumber: '0987654321',
        address: '456 Doctor Avenue',
        birthDate: '1985-07-24',
        role: ROLES.DOCTOR,
      },

      // Nurses
      {
        firstName: 'Emily',
        lastName: 'Brown',
        email: 'emily.brown@hospital.com',
        password: 'password123',
        phoneNumber: '1122334455',
        address: '789 Nurse Lane',
        birthDate: '1990-01-15',
        role: ROLES.NURSE,
      },
      {
        firstName: 'Michael',
        lastName: 'Johnson',
        email: 'michael.johnson@hospital.com',
        password: 'password123',
        phoneNumber: '6677889900',
        address: '101 Nurse Blvd',
        birthDate: '1992-10-10',
        role: ROLES.NURSE,
      },

      // Relatives
      {
        firstName: 'Sarah',
        lastName: 'Williams',
        email: 'sarah.williams@gmail.com',
        password: 'password123',
        phoneNumber: '2233445566',
        address: '102 Family Road',
        birthDate: '1975-05-22',
        role: ROLES.RELATIVE,
      },
      {
        firstName: 'David',
        lastName: 'Miller',
        email: 'david.miller@gmail.com',
        password: 'password123',
        phoneNumber: '3344556677',
        address: '303 Family Circle',
        birthDate: '1982-11-03',
        role: ROLES.RELATIVE,
      },

      // Patients
      {
        firstName: 'Alice',
        lastName: 'Davis',
        email: 'alice.davis@patients.com',
        password: 'password123',
        phoneNumber: '4455667788',
        address: '404 Patient Lane',
        birthDate: '1965-02-20',
        role: ROLES.PATIENT,
      },
      {
        firstName: 'Robert',
        lastName: 'Wilson',
        email: 'robert.wilson@patients.com',
        password: 'password123',
        phoneNumber: '5566778899',
        address: '505 Patient Avenue',
        birthDate: '1958-09-14',
        role: ROLES.PATIENT,
      },
    ])
  }
}
