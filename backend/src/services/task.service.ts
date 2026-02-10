import prisma from "../config/db.ts";

export const createTask = async (data: {
  title: string;
  description?: string;
  projectId: string;
  parentId?: string;
  assigneeId?: string;
  priority: string;
}) => {
  return await prisma.task.create({
    data: {
      title: data.title,
      description: data.description ?? null,
      projectId: data.projectId,
      parentId: data.parentId ?? null,
      assigneeId: data.assigneeId ?? null,
      priority: data.priority ?? null,
    },
    include: {    
      subtasks: true, // Return subtasks if any exist (usually empty on create) 
    },
  });
};

export const getProjectTasks=async(projectId:string)=>{
  return await prisma.task.findMany({
    where:{
      projectId,
      parentId:null,
    },
    include:{
      subtasks:{
        include:{
          subtasks:true
        }
      }
    }
  })
}