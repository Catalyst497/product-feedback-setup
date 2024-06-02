import React from 'react'
import jwt from 'jsonwebtoken'

export async function POST(req, res) {
  try {
    const {token} = await req.json()
    // const token = req.headers.authorization?.replace('Bearer ', '')

    if (!token) {
      return new Response(JSON.stringify({ message: 'Unauthorized' }), {status: 401})
    }

    const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_TOKEN_SECRET);
    return new Response(JSON.stringify({message: 'User authorized.', user: decoded}), {status: 200})
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      // Token is expired, send back a 401 Unauthorized response
      return new Response(JSON.stringify({ message: 'Token expired' }), {status: 401})
    } else {
      // Token verification failed for another reason, send back a 401 Unauthorized response
      return new Response(JSON.stringify({ message: 'Unauthorized' }), {status: 401})
    }
  }
  
}