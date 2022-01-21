import Link from "next/link";
import React, { FunctionComponent } from "react";

export type ProjectCardProps = {
    img_path: string,
    title: string,
    desc: string,
    project_link: string
}

const ProjectCard: FunctionComponent<ProjectCardProps> = ({img_path, title, desc, project_link}) => {
    return (
        <div className="project-card">
            <a href={project_link}  target="_blank" rel="noopener noreferrer">
                <div className="info">
                    <span className="img-holder">
                        <img src={img_path} alt=""/>
                        <span className="description-container"><span className="description">{desc}</span></span>
                    </span>
                    <span className="name">{title}</span>
                </div>
            </a>
        </div>
    )
}

export default ProjectCard