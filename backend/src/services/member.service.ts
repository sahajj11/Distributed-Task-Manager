import prisma from "../config/db.ts";

export const addMemberToProject=async(projectId : string , userId : string,role:string='Member' )=>{
    return await prisma.projectMember.create({
        data:{
            projectId,
            userId,
            role
        },
        include:{
            user:{
                select:{
                    id:true,
                    name:true,
                    email:true
                }
            },
            project:{
                select:{
                    name:true
                }
            }
        }
    })
}