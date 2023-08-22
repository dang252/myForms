import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import GitHubProvider from "next-auth/providers/github"
import LinkedInProvider from "next-auth/providers/linkedin"

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID ?? "",
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET ?? "",
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID ?? "",
            clientSecret: process.env.GITHUB_SECRET ?? ""
        }),
        LinkedInProvider({
            clientId: process.env.LINKEDIN_CLIENT_ID ?? "",
            clientSecret: process.env.LINKEDIN_CLIENT_SECRET ?? ""
        })
    ],
    callbacks: {
        // async signIn({ user, account, profile, email, credentials }) {
        //     // console.log("user", user)
        //     const res = await fetch('https://localhost:7299/auth/oauth', {
        //         method: 'POST',
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify({
        //             Email: user.email,
        //             USername: user.name,
        //         })
        //     })
        //     const isAllowedToSignIn = true
        //     if (!res.ok) {
        //         return false;
        //     }
        //     else {
        //         const data = await JSON.parse(await res.text())
        //         console.log(data)
        //         return true;
        //     }
        // }
    }
});

export { handler as GET, handler as POST };