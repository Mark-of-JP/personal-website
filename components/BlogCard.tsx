import Link from "next/link";
import React, { FunctionComponent } from "react";

export type BlogSnippetType = {
    slug: string,
    frontmatter: {
        post_image: string,
        date: string,
        excerpt: string,
        title: string
    }
}

export type BlogCardProp = {
    blog_snippet: BlogSnippetType
}

const BlogCard: FunctionComponent<BlogCardProp> = ({blog_snippet}) => {
    
    const {title, excerpt, date, post_image} = blog_snippet.frontmatter

    return (
        <Link href={`/blog/${blog_snippet.slug}`} passHref>
            <div className="blog-card">
                <img src={post_image} />

                <div className="blog-card-text-container">
                    <div className="blog-card-text">
                        <h2>{title}</h2>
                        <p className="blog-card-date">{date}</p>
                        <p>{excerpt}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default BlogCard