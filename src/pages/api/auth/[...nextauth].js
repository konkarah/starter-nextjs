import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import AuthError  from "next-auth";

// Assuming you have a function to validate user credentials
// This would typically involve checking against a database
async function validateUser(credentials) {
  try {
    // Example: Replace this with your actual user validation logic
    // This might involve querying a database, checking password hash, etc.
    const response = await fetch('http://localhost:3002/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
      // Handle different types of authentication errors
      if (response.status === 401) {
        throw new Error('Invalid credentials');
      } else if (response.status === 403) {
        throw new Error('Account is locked');
      } else {
        throw new Error('Authentication failed');
      }
    }

    return await response.json();
  } catch (error) {
    // Log the error (consider using a proper logging mechanism)
    console.error('Authentication error:', error);
    
    // Rethrow to be caught by NextAuth
    throw error;
  }
}

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "your@email.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Validate input
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        }

        try {
          // Validate user against your authentication method
          const user = await validateUser({
            email: credentials.email,
            password: credentials.password
          });

          // Return user object if authentication is successful
          return {
            id: user.id,
            email: user.email,
            name: user.name
          };
        } catch (error) {
          // This will be passed to the client as the error
          throw new AuthError(error.message || 'Authentication failed');
        }
      },
    }),
  ],
  pages: {
    signIn: '/api/auth/login',  // Custom sign-in page
    error: '/login',   // Error page for authentication failures
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      return session;
    },
  },
};

export default NextAuth(authOptions);