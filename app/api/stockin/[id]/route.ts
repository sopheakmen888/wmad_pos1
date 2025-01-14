import prisma from "@/lib/prisma";
import { NextRequest,NextResponse } from "next/server";
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const {id} = params;
    try {
        const body = await request.json();
        const { supplierId, referenceNumber, stockInDate } = body;

        const updateStockin = await prisma.stockIn.update({
            where: { id: parseInt(id) },
            data: { supplierId, referenceNumber, stockInDate }
        });
        return NextResponse.json({ message: "update stock success" })
    } catch (error) {
        console.log(error)
    }
}

export async function DELETE(request:NextRequest, {params}:{params:{id:string}}) {
    const {id}=params;
    try{

        const deleteRelate= await prisma.stockInDetail.deleteMany({
            where:{stockInId:parseInt(id)}
        })
        const deleteStockIn = await prisma.stockIn.delete({
            where: { id: parseInt(id) },
        });
        return NextResponse.json({ message: "deleted stock success",data: deleteStockIn  })

    }catch(error){
        console.log(error)
        return NextResponse.json({ message: "delete failed!"  }, {status: 500})
    }
    
}

export async function GET(request:NextRequest, {params}:{params:{id:string}}) {
    const {id}=params;
    try{
        const getUniguetockIn = await prisma.stockIn.findUnique({
            where: { id: parseInt(id) },
        });
        return NextResponse.json({ message: "get unique stock success",data: getUniguetockIn  })

    }catch(error){
        console.log(error)
        return NextResponse.json({ message: "delete failed!"  }, {status: 500})
    }
    
}