import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Select from 'react-select'
import { z } from 'zod'
import { User, UserSchema } from '../../schemas/userSchema'
import { Button } from '../ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { SheetClose } from '../ui/sheet'
import axiosInstance from '../utils/axiosInstance'
const UserForm = ({ initialUser }: { initialUser?: User }) => {
    const form = useForm<z.infer<typeof UserSchema>>({
        resolver: zodResolver(UserSchema),
        defaultValues: {
            name: initialUser?.name || '',
            email: initialUser?.email || '',
            phoneNumber: initialUser?.phoneNumber || '',
            address: {
                city: initialUser?.address?.city || '',
                country: initialUser?.address?.country || '',
                district: initialUser?.address?.district || '',
                province: initialUser?.address?.province || '3',
            },
            dob: initialUser?.dob || '',
            profilePicture: initialUser?.profilePicture || '',
        },
    })

    const onSubmit = (values: z.infer<typeof UserSchema>) => {
        alert('Sub')
        console.log('Values', values)
        localStorage.setItem('Apple', 'taste')
    }

    const [countries, setCountries] = useState([])

    useEffect(() => {
        let isMounted = true

        const fetchCountries = async () => {
            try {
                const response = await axiosInstance.get('/all?fields=name')
                if (isMounted) {
                    const sortedByName = () => {
                        return response.data.sort((a: any, b: any) =>
                            a.name.common.localeCompare(b.name.common)
                        )
                    }
                    const options = sortedByName().map((country: any) => ({
                        value: country.name.common,
                        label: country.name.common,
                    }))
                    setCountries(options)
                }
            } catch (err) {
                console.error('Error fetching data:', err)
            }
        }
        fetchCountries()
        return () => {
            isMounted = false
        }
    }, [])

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex">Name *</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter Name..."
                                    {...field}
                                    autoComplete="name"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex">Email *</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter Email..."
                                    {...field}
                                    autoComplete="email"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-between gap-2">
                    <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex">
                                    Phone Number *
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="Enter Your Number..."
                                        autoComplete="phoneNumber"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="dob"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex">
                                    Date of Birth
                                </FormLabel>
                                <FormControl>
                                    <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex flex-col gap-5">
                    <div className="flex gap-2 justify-between">
                        <FormField
                            control={form.control}
                            name="address.country"
                            render={({ field }) => (
                                <FormItem className="w-[300px]">
                                    <FormLabel className="flex">
                                        Country
                                    </FormLabel>
                                    <FormControl>
                                        {/* <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    {field.value}
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {!countries
                                                    ? 'Loading...'
                                                    : countries.map(
                                                          (country: any) => {
                                                              return (
                                                                  <SelectItem
                                                                      key={
                                                                          country
                                                                              .name
                                                                              .common
                                                                      }
                                                                      value={
                                                                          country
                                                                              .name
                                                                              .common
                                                                      }
                                                                  >
                                                                      {
                                                                          country
                                                                              .name
                                                                              .common
                                                                      }
                                                                  </SelectItem>
                                                              )
                                                          }
                                                      )}
                                            </SelectContent>
                                        </Select> */}
                                        <Select
                                            options={countries}
                                            onChange={(option: any) =>
                                                field.onChange(option?.value)
                                            }
                                            defaultValue={{
                                                value: field.value,
                                                label: field.value,
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="address.city"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex">City</FormLabel>
                                    <FormControl>
                                        <Input {...field} autoComplete="city" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex g-2 flex-row-reverse justify-between">
                        <FormField
                            control={form.control}
                            name="address.province"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex">
                                        Province
                                    </FormLabel>
                                    {/* <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                {field.value}
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="1">1</SelectItem>
                                            <SelectItem value="2">2</SelectItem>
                                            <SelectItem value="3">3</SelectItem>
                                            <SelectItem value="4">4</SelectItem>
                                            <SelectItem value="5">5</SelectItem>
                                            <SelectItem value="6">6</SelectItem>
                                            <SelectItem value="7">7</SelectItem>
                                        </SelectContent>
                                    </Select> */}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="address.district"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex">
                                        District
                                    </FormLabel>
                                    <Input
                                        placeholder="Enter your district"
                                        {...field}
                                        autoComplete="district"
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <Button type="submit">Submit</Button>
                <SheetClose asChild>close</SheetClose>
            </form>
        </Form>
    )
}

export default UserForm
