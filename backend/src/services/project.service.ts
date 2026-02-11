import prisma from "../config/db.ts";

export const createProject = async (name: string,userId: string, description?: string) => {
  return await prisma.project.create({
    data:{
        name,
        description:description ?? null,
        members:{
            create:{
                userId:userId,
                role:"OWNER"
            }
        }
    },
    include:{
        members:true
    }
  });
};

export const getAllProjects=async()=>{
    return await prisma.project.findMany({
        include:{
            _count:{
                select:{tasks:true}
            }
        }
    })
}

export const getUserProjects = async (userId: string) => {
  return await prisma.project.findMany({
    where: {
      members: {
        some: { userId }
      }
    },
    include: {
      _count: { select: { tasks: true } }
    }
  });
};