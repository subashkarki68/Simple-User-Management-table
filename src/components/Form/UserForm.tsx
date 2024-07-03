import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import Select from 'react-select'
import { z } from 'zod'
import { addUser, updateUser } from '../../redux/slices/users/usersSlice'
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
import {
    SelectContent,
    SelectItem,
    SelectTrigger,
    Select as SelectUI,
} from '../ui/select'
import { SheetClose } from '../ui/sheet'
import axiosInstance from '../utils/axiosInstance'
const UserForm = ({
    initialUser,
    editingUser,
}: {
    initialUser?: User
    editingUser: boolean
}) => {
    const [countries, setCountries] = useState([])
    const [selectedImage, setSelectedImage] = useState('')

    const imageSelectRef = useRef<HTMLInputElement>(null)
    const closeSheetRef = useRef<HTMLButtonElement>(null)

    const dispatch = useDispatch()

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

    // const onSubmit = (values: z.infer<typeof UserSchema>) => {
    //     console.log(values)
    //     // const newValues = (): User =>
    //     //     isIterable(Users) ? [...Users, values] : [values]

    //     if (!editingUser) {
    //         if (Users === undefined || isEmpty(Users)) return onAddUser(values)
    //         const user = Users.find((u: User) => u.email === values.email)
    //         if (!user) {
    //             onAddUser(values)
    //             if (closeSheetRef.current) {
    //                 closeSheetRef.current.click()
    //             }
    //         } else alert('Email Already Exist')
    //     } else {
    //         //TODO
    //         console.log('editing')
    //         console.log(Users)
    //     }
    // }

    const onSubmit = (values: z.infer<typeof UserSchema>) => {
        console.log('Adding new User', values)
        if (editingUser) {
            const editedUser = dispatch(updateUser(values))
            console.log('editedUser', editedUser)
        } else {
            const newUser = dispatch(addUser(values))
            console.log('User Added:', newUser)
        }
        closeSheetRef.current?.click()
    }

    const handleImageClick = () => {
        if (imageSelectRef.current) imageSelectRef.current.click()
    }
    const handleImageChange = (event: any, field: any) => {
        const file = event.target.files[0]
        if (file) {
            const imageURL = URL.createObjectURL(file)
            setSelectedImage(imageURL)
            field.onChange(imageURL)
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                encType="multipart/form-data"
                className="space-y-8"
            >
                <div className="flex justify-between gap-2">
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
                        name="profilePicture"
                        render={({ field }) => (
                            <FormItem className="flex flex-col items-center">
                                <FormLabel>Upload Image</FormLabel>
                                <FormControl>
                                    <div>
                                        <Input
                                            type="file"
                                            accept="image/png"
                                            name={field.name}
                                            ref={imageSelectRef}
                                            style={{ display: 'none' }}
                                            onChange={(event) =>
                                                handleImageChange(event, field)
                                            }
                                        />
                                        <img
                                            onClick={handleImageClick}
                                            className="rounded-full cursor-pointer hover:opacity-70"
                                            alt="User Image"
                                            width={'60px'}
                                            height={'60px'}
                                            src={
                                                selectedImage ||
                                                'https://th.bing.com/th/id/R.6b0022312d41080436c52da571d5c697?rik=ejx13G9ZroRrcg&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fuser-png-icon-young-user-icon-2400.png&ehk=NNF6zZUBr0n5i%2fx0Bh3AMRDRDrzslPXB0ANabkkPyv0%3d&risl=&pid=ImgRaw&r=0'
                                            }
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex">Email *</FormLabel>
                            <FormControl>
                                <Input
                                    disabled={initialUser?.email ? true : false}
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
                            render={({ field }: { field: any }) => (
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
                                            name={field.name}
                                            options={countries}
                                            onChange={(option: any) =>
                                                field.onChange(option?.value)
                                            }
                                            defaultValue={{
                                                value: 'Nepal',
                                                label: 'Nepal',
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
                                    <SelectUI
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
                                    </SelectUI>
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
                <SheetClose asChild>
                    <Button
                        style={{ display: 'none' }}
                        ref={closeSheetRef}
                    ></Button>
                </SheetClose>
            </form>
        </Form>
    )
}

export default UserForm
