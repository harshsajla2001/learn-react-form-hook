import { DevTool } from "@hookform/devtools";
import { useForm } from "react-hook-form";

let renderCount = 0

type FormValues = {
    username: string
    email: string
    channel: string
}

export const YouTubeForm = () => {
    const form = useForm<FormValues>({
        defaultValues: async () => {
            const response = await fetch("https://jsonplaceholder.typicode.com/users/1")
            const data = await response.json()
            return {
                username: data.username,
                email: data.email,
                channel: 'coder',
            }
        }
    })
    console.log(form)
    const { register, control, handleSubmit, formState, } = form
    const { errors } = formState
    const onSubmit = (data: FormValues) => {
        console.log('From submitted', data)
    }

    renderCount++
    return (
        <div style={{ marginLeft: '50px' }}>
            <h1>YouTube From ( {renderCount / 2} )</h1>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <label htmlFor="username">Username</label>
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
                            }
                        }
                    })} />
                <p>{errors.username?.message}</p>
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
                <button>Submit</button>
            </form>

            <DevTool control={control} />

        </div>
    );
};