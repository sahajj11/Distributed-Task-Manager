import type { Request, Response } from "express";
import * as ProjectService from '../services/project.service.ts';

export const createProject=async(req:Request , res :Response)=>{
    try{
        const {name , description , userId} = req.body
        if(!name || !userId ){
            res.status(400).json({error:"Project name and UserId is required"})
        }

        const project=await ProjectService.createProject(name,userId,description)
        return res.status(201).json(project)

    }catch(err){
        res.status(500).json({ error: err });
    }
}

export const getAllProjects=async(req:Request , res :Response)=>{
    try{
        const projects=await ProjectService.getAllProjects()
        res.json(projects)

    }catch(err){
        res.status(500).json({ error: err });
    }
}

export const getMyProjects = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query; // Usually passed via query params or Auth middleware

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required to fetch projects' });
    }

    const projects = await ProjectService.getUserProjects(userId as string);
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};