import prisma from "../util/prisma";


export async function getPageURLs(): Promise<string[]> {
    
    try {
        const urls = await prisma.page.findMany({
            select: {
                url: true
            }
        });

        return urls.map(page => page.url);
    } catch (error) {
        console.error("Could not fetch page urls:", error);
        return [];
    }
}


export async function getPage(url: string): Promise<PageData|null> {
    try {
        let page = await prisma.page.findUnique({
            where: {
                url: url
            }
        });
        if(!page) {
            return null;
        }
        const { id, ...pageData } = page;
        return pageData as any;
    } catch (error) {
        console.log("Could not fetch page:", error);
        return null;
    }
}