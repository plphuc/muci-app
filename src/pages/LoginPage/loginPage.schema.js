import { REQUIRE_FIELD } from 'common/message.constant'

export const registerPasswordRules = [
    {
        required: true,
        message: REQUIRE_FIELD('Password'),
    },
    {
        pattern: /(?=.*[a-z])/,
        message: REQUIRE_FIELD('Must contain lowercase letter'),
    },
    {
        pattern: /(?=.*[A-Z])/,
        message: REQUIRE_FIELD('Must contain uppercase letter'),
    },
    {
        pattern: /(?=.*[^a-zA-Z\d])/,
        message: 'Must contain special character',
    },
    {
        pattern: /^.{8,}$/,
        message: 'Password must be at least 8 characters',
    },
]

export const loginPasswordRules = [
    {
        required: true,
        message: REQUIRE_FIELD('Password'),
    },
]
