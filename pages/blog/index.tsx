import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { sortByDate } from '../../utils/utils'

import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import BlogCard, { BlogSnippetType } from '../../components/BlogCard'

const Blogs: NextPage<{posts: Array<BlogSnippetType>}> = ({posts}) => {
  return (
    <>
      <Head>
        <title>Blogs</title>
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
          <div className="top-margin">
            <h2 className="main-section-title"><span>Blog Posts</span></h2>

            <div className='blog-card-container'>
              {posts.map((post, index) => (
                <BlogCard blog_snippet={post} key={index} />
              ))}
            </div>
          </div>

        </div>
      </main>
    </>
  )
}

export default Blogs

export async function getStaticProps() {

  const files = fs.readdirSync(path.join('posts'))
  const posts = (files.map(filename => {

    const slug = filename.replace('.md', '')

    const markdownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf-8')

    const { data:frontmatter } = matter(markdownWithMeta)

    return {
      slug,
      frontmatter
    }
  }))

  return {
    props: {
      posts: posts.sort(sortByDate)
    }
  }
}