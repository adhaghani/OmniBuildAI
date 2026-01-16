import React from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from './ui/button'

const ProjectSelection = () => {
  return (
    <SidebarMenu>
        <SidebarMenuItem>
            <Select>
                <SelectTrigger className='w-full'>
                    <SelectValue placeholder="Select Project" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="project-1">Project 1</SelectItem>
                        <SelectItem value="project-2">Project 2</SelectItem>
                        <SelectItem value="project-3">Project 3</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </SidebarMenuItem>

    </SidebarMenu>
  )
}

export default ProjectSelection