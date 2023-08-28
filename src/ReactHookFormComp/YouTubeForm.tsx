import { DevTool } from "@hookform/devtools";
import { useEffect } from "react";
import { FieldErrors, useFieldArray, useForm } from "react-hook-form";

let renderCount = 0

type FormValues = {
    username: string
    email: string
    channel: string
    social: {
        twitter: string
        facebook: string
    }
    phoneNumber: string[]
    phNumbers: {
        number: string;
    }[]
    age: number
    dob: Date
}

export const YouTubeForm = () => {
    const form = useForm<FormValues>({
        defaultValues: async () => {
            const response = await fetch("https://jsonplaceholder.typicode.com/users/1")
            const data = await response.json()
            return {
                username: '',
                email: data.email,
                channel: 'coder',
                social: {
                    twitter: '',
                    facebook: ''
                },
                phoneNumber: ['', ''],
                phNumbers: [{ number: '' }],
                age: 0,
                dob: new Date()
            }
        },
        mode: "onBlur"
    })

    console.log(form)

    const { register, control, handleSubmit, formState, watch, getValues, setValue, reset, trigger } = form
    const { errors, isDirty, isValid, isSubmitting, isSubmitted, isSubmitSuccessful, submitCount } = formState

    const onSubmit = (data: FormValues) => {
        console.log('From submitted', data)
    }
    const onError = (errors: FieldErrors<FormValues>) => {
        console.log('From errors', errors)
    }


    const { fields, append, remove } = useFieldArray({
        name: 'phNumbers',
        control
    })

    const handleGetValues = () => {
        // console.log("Get Value", getValues());
        console.log("Get Value", getValues(['username', 'email']));
    }

    const handleSetValues = () => {

        console.log("Set Value", setValue('username', 'Don'));

    }

    useEffect(() => {
        const subscription = watch((value) => {
            console.log(value)
        })
        return () => subscription.unsubscribe()
    }, [watch])

    // const watchUsername = watch(['username','email'])
    const watchUsername = watch();

    renderCount++

    return (
        <div style={{ marginLeft: '50px' }}>
            <h1>YouTube From ({renderCount / 2})</h1>
            <h1>Watched value: {JSON.stringify(watchUsername)}</h1>
            <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
                <label htmlFor="username"> Username </label>
                <br />
                <input type="text" id="username"
                    {...register("username", {
                        required: {
                            value: true,
                            message: "username required"
                        },
                        validate: {
                            notAdmin: (fieldValue) => {
                                return (
                                    fieldValue !== "harsh" || "Enter another username"
                                )
                            },
                            notBlackListed: (fieldValue) => {
                                return !fieldValue.endsWith("h") || "This is not valid"
                            },
                            emailAvailable: async (fieldValue) => {
                                const response = await fetch("https://jsonplaceholder.typicode.com/users/1")
                                const data = await response.json()
                                return data.name == 'Bret' ||'name already exists'
                            }
                        }
                    })} />
                <p>{errors.username?.message}</p>
                {/* <h1>Watched value: {watchUsername}</h1> */}
                <br />
                <label htmlFor="email">E-mail</label>
                <br />
                <input type="email" id="email" {...register("email", {
                    required: "Username is required"
                })} />
                <p>{errors.email?.message}</p>
                <br />
                <label htmlFor="channel">Channel</label>
                <br />
                <input type="text" id="channel" {...register("channel", {
                    required: "Username is required"
                })} />
                <p>{errors.channel?.message}</p>
                <br />
                <label htmlFor="twitter"> Twitter </label>
                <br />
                <input type="text"
                    {...register("social.twitter", {
                    })} />
                <br />
                <label htmlFor="facebook"> Facebook </label>
                <br />
                <input type="text"
                    {...register("social.facebook", {
                    })} />
                <br />
                <label htmlFor="facebook"> Primary Phone Number </label>
                <br />
                <input type="number"
                    {...register("phoneNumber.0")} />
                <br />
                <label htmlFor="facebook"> Secondary Phone Number </label>
                <br />
                <input type="number"
                    {...register("phoneNumber.1")} />
                <br />
                <div>
                    <label> List of Phone Number </label>
                    <div>
                        {fields.map((field, index) => (
                            <div key={field.id}>
                                <input type="text" {...register(`phNumbers.${index}.number` as const)} />
                                {
                                    index > 0 && (
                                        <button type="button" onClick={() => remove(index)}> Remove Phone Number </button>
                                    )
                                }
                            </div>
                        ))}
                    </div>
                    <button type="button" onClick={() => append({ number: '' })}> Add Phone Number </button>
                </div>
                <div>
                    <label htmlFor="age">Age</label>
                    <br />
                    <input type="number" id="age" {
                        ...register("age", {
                            required: {
                                value: true,
                                message: "Age is required",
                            }
                        })
                    } />
                    <p>{errors.age?.message}</p>
                </div>
                <div>
                    <label htmlFor="dob"> Date Of Birth </label>
                    <br />
                    <input
                        type="date"
                        id="dob" {
                        ...register("dob", {
                            valueAsDate: true,
                            required: {
                                value: true,
                                message: "Date Of Birth is required",
                            }
                        })} />
                    <p>{errors.dob?.message}</p>
                </div>
                {/* <button disabled={!isDirty || !isValid || isSubmitting}> Submit </button> */}
                <button > Submit </button>
                <button type="button" onClick={() => handleGetValues()}> Get value </button>
                <button type="button" onClick={() => handleSetValues()}> Set value </button>
                <button type="button" onClick={() => reset()}> Reset </button>
                <button type="button" onClick={() => trigger("username")}> Validate </button>
            </form>
            <DevTool control={control} />
        </div>
    );
};

