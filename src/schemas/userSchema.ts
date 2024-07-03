import { z } from 'zod'

export const UserSchema = z.object({
    name: z.string().min(1, {
        message: 'Name is required',
    }),
    email: z.string().min(1, { message: 'Email is required' }).email(),
    phoneNumber: z
        .string()
        .min(7, { message: 'Phone Number must be 7 digits' })
        .regex(/^\d+$/),
    dob: z.string().refine(
        (dob) => {
            // function to validate dob is newer than today's date
            const today = new Date()
            const dobDate = new Date(dob)
            return dobDate < today
        },
        { message: 'Time Travellers not allowed' }
    ),
    address: z.object({
        city: z.string(),
        district: z.string(),
        province: z.union([
            z.literal('1'),
            z.literal('2'),
            z.literal('3'),
            z.literal('4'),
            z.literal('5'),
            z.literal('6'),
            z.literal('7'),
        ]),
        country: z.string().default('Nepal'),
    }),
    profilePicture: z.string().url().default(''),
})

export type User = z.infer<typeof UserSchema>
export type AddressType = z.infer<typeof UserSchema>['address']
