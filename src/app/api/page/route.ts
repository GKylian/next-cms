import prisma from "@/app/util/prisma";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const url = req.nextUrl.searchParams.get("url");
    if (!url)
        return new Response(JSON.stringify({ message: "Missing parameters (url) !" }), { status: 400 });

    try {
        const page = await prisma.page.findUnique({
            where: {
                url
            }
        });
    
        if (!page)
            return new Response(JSON.stringify({ message: "Page not found !" }), { status: 404 });
        return new Response(JSON.stringify(page), { status: 200 });
        
    } catch (error) {
        return new Response(JSON.stringify({ message: "Error fetching page !\n"+error }), { status: 500 });
    }
}



export async function POST(req: NextRequest) {
    if (!req.body) return new Response(JSON.stringify({ message: "Missing body !" }), { status: 400 });
    const page: PageData = await req.json();
    page.updatedAt = new Date();

    if (!page.url || !page.title || !page.blocks) 
        return new Response(JSON.stringify({ message: "Missing parameters (url, title or blocks) !" }), { status: 400 });

    try {        
        const pageReturn = await prisma.page.create({
            data: page
        })
    } catch (error) {
        return new Response(JSON.stringify({ message: "Could not create page !\n"+error }), { status: 500 });
    }
    

    return new Response(JSON.stringify({ message: "Page successfully created !" }), { status: 201 });
}



export async function PUT(req: NextRequest) {
    if (!req.body) return new Response(JSON.stringify({ message: "Missing body !" }), { status: 400 });
    const page: PageData = await req.json();
    page.updatedAt = new Date();

    if (!page.url || !page.title || !page.blocks) 
        return new Response(JSON.stringify({ message: "Missing parameters (url, title or blocks) !" }), { status: 400 });

    try {
        const pageReturn = await prisma.page.update({
            where: {
                url: page.url
            },
            data: page
        });
    } catch (error) {
        return new Response(JSON.stringify({ message: "Could not update page !\n"+error }), { status: 500 });
    }

    return new Response(JSON.stringify({ message: "Page successfully updated !" }), { status: 200 });
}



export async function DELETE(req: NextRequest) {
    const url = req.nextUrl.searchParams.get("url");

    if (!url)
        return new Response(JSON.stringify({ message: "Missing parameters (url) !" }), { status: 400 });

    try {
        const page = await prisma.page.delete({
            where: {
                url
            }
        });
    } catch (error) {
        return new Response(JSON.stringify({ message: "Could not delete page !\n"+error }), { status: 500 });
    }

    return new Response(JSON.stringify({ message: "Page successfully deleted !" }), { status: 200 });
}