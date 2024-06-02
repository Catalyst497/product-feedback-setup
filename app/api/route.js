// import { NextRequest, NextResponse } from "next/server";

export default function GET(req, res) {
    return new Response (JSON.stringify({ message: 'Hello world.' }))
}