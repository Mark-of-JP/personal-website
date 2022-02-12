import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import {marked} from 'marked'

import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

type PageProps = {
    frontmatter: {
        post_image: string,
        date: string,
        excerpt: string,
        title: string
    }
    slug: string,
    content: string
}

const BlogPage: NextPage<PageProps> = ({frontmatter, content}) => {
  return (
    <>
      <Head>
        <title>{frontmatter.title}</title>
        <meta itemProp='name' content={frontmatter.title} />
        <meta itemProp='description' content={frontmatter.excerpt} />
      </Head>

      <header className="header-container" id="head">
        <div className='header-img' />
        <div className='header-text-container'>
          <h1>
            <span className="header-name">Mark JP Sanchez</span>
            <span className="header-tagline">
              Data Science, Computer Science, Neural Network and Machine Learning <br />
              <a>mark.of.sanchez@gmail.com</a> 
              </span>
            <span className='header-socials-container'>
              <a href='https://github.com/Mark-of-JP' target="_blank" rel="noopener noreferrer">
                <img src='/github-icon.png' alt=""></img></a>
              <a href='https://www.linkedin.com/in/mark-of-jp-5406/' target="_blank" rel="noopener noreferrer">
                <img src='/linkedin-logo.png' alt=""></img></a>
            </span>
          </h1>
        </div>
      </header>

      <nav className="navbar">
        <div className='navbar-container'>
          <ul>
          <Link href="/" passHref><li>Home</li></Link>
            <Link href="/blog" passHref><li>Blog</li></Link>
            <a href="Mark_JP_Resume.pdf" download="MarkJP_Resume.pdf"><li>Resume</li></a>
          </ul>
        </div>
      </nav>

      <main id="main">
        <div className='main-content-container'>
            <div className="top-margin blog-container">
                <h1 className='title'>{frontmatter.title}</h1>
                <p className='date'>{frontmatter.date}</p>
                <img className='title-image' src={frontmatter.post_image} alt=""></img>
                <div className='blog-content'>
                    <div dangerouslySetInnerHTML={{__html: marked(content)}}></div>
                </div>
            </div>
        </div>
      </main>

      <footer>
        <div className='footer-container'>
          <h3>Contact</h3>
          <p>
            +1 (905)-807-3667 <br/>
            mark.of.sanchez@gmail.com
          </p>
        </div>
      </footer>
    </>
  )
}

export default BlogPage

export async function getStaticPaths() {
    const files = fs.readdirSync(path.join('posts'))

    const paths = files.map(filename => ({
        params: {
            slug: filename.replace('.md', '')
        }
    }))
    
    return {
        paths,
        fallback: false
    }
}

type PropParams = {
    params: {
        slug: string
    }
}


export async function getStaticProps(props: PropParams) {
    const slug = props.params.slug;
    const markdownWithMeta = fs.readFileSync(path.join('posts', slug + ".md"), 'utf-8')

    const {data: frontmatter, content} = matter(markdownWithMeta)

    return {
        props: {
            frontmatter,
            slug,
            content
        }
    }
}