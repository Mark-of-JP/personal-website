import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'

import ProjectCard from '../components/ProjectCard'
import BlogCard, { BlogSnippetType } from '../components/BlogCard'
import { sortByDate } from '../utils/utils'

const Home: NextPage<{posts: Array<BlogSnippetType>}> = ({posts}) => {
  return (
    <>
      <Head>
        <title>Homepage</title>
        <meta itemProp='name' content='Mark JP Sanchez Portfolio' />
        <meta itemProp='description' content='Hey! My name is Mark JP Sanchez and I am Data Science and Computer Science student at the University of Toronto. <br/>
                I have studied and worked with Neural Networks, Machine Learning, Parallel Programming, Data Analysis and Linux. For tech-stack, I have worked with Python (NumPy, PyTorch, Tensorflow), C/C++ (OpenMP, MPI), AWS (Amplify, EC2) and JavaScript (NextJS, React, Node).<br/>
                Thank you for checking out my site and hope you enjoy your stay!' />
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
          <div className='main-about-container top-margin'>
              <p>Hey! My name is Mark JP Sanchez and I am Data Science and Computer Science student at the University of Toronto. <br/>
                I have studied and worked with Neural Networks, Machine Learning, Parallel Programming, Data Analysis and Linux. For tech-stack, I have worked with Python (NumPy, PyTorch, Tensorflow), C/C++ (OpenMP, MPI), AWS (Amplify, EC2) and JavaScript (NextJS, React, Node).<br/>
                Thank you for checking out my site and hope you enjoy your stay!</p>
          </div>

          <div className="top-margin">
            <h2 className="main-section-title"><span>Featured Projects</span></h2>
            <div className='project-grid'>
              <ProjectCard 
                img_path='/projects/frc_match_sim.png' 
                title='FRC Match Simulator' 
                desc='Utilizing a Random Forest, Nearest Neighbour, Logistic Regression and Naive Bayes classifier, I created a model that was 70% accurate in predicting the winner in an FRC match.'
                project_link='https://github.com/Mark-of-JP/FRC-Match-Simulator/blob/master/FRC_Match_Simulator.ipynb'/>
              <ProjectCard 
                img_path='/projects/personal_website.png' 
                title='Personal Website/Blog' 
                desc='This website! Hosted on AWS Amplify and made with NextJS.'
                project_link='https://github.com/Mark-of-JP/personal-website'/>
              <ProjectCard 
                img_path='/projects/everglad_messaging_frontend.png' 
                title='Everglade Messaging (API)' 
                desc='A simple back-end for a messaging application using Flask and Websockets for real-time chatting.'
                project_link='https://github.com/Mark-of-JP/Messaging-Api'/>
              <ProjectCard 
                img_path='/projects/stats_portfolio.png' 
                title='STA303 Portfolio' 
                desc='A portfolio project created for the University of Toronto Statistics class. Demonstrates an overview of my knowledge and understanding with stats concepts and technologies.'
                project_link='https://github.com/Mark-of-JP/STA303-Portfolio/blob/main/sta303-w22-portfolio.pdf'/>
            </div>
          </div>

          <div className="top-margin">
            <h2 className="main-section-title"><span>Work Experience</span></h2>
            
            <div className='work-experience'>
              <h2>Energy Trading Analyst - Dynasty Power Inc. (May 2022 - August 2023)</h2>
              <p>
                - Traded SPP Virts and CAISO DA Financial contracts <br/>
                - Produced machine learning models to predict energy and gas prices <br/>
                - Tagged and bid energy and transmission rights <br/>
                - Developed and scheduled scripts which scraped data off of public resources and stored info into company databases <br/>
                - Developed tools using VBA, Python, and R which allowed traders to easily look at desired data and statistics in real time <br/>
                - Made automated daily scripts which sent emails about current market conditions
              </p>
            </div>
            <div className='work-experience'>
              <h2>STATA Developer - University Health Network [KHERG] (September 2020 - Present)</h2>
              <p>
                - Developed machine learning model using Random Forest regressor, Support Vector regressor, Gradient Boosted regressor and Naive Bayes regressor to improve dynamic questionnaire algorithm by reducing the amount of questions asked on average <br/>
                - Assisted researchers with statistical tools and developed scripts for analysis such as model selection under multiple imputation <br/>
                - Monitored and maintained the processes surrounding the data and ensure there weren&apos;t any problems in the dataset
              </p>
            </div>

            <div className='work-experience'>
              <h2> Software Engineer Intern - PointClickCare (July 2019 - August 2019)</h2>
              <p>
                - Developed a mobile financial analytics app that visualized financial data for health industry providers using React Native <br/>
                - Authenticated users, worked with DevOps, developed tests and pitched to C-level officers in the company
              </p>
            </div>
          </div>

          <div className="top-margin">
            <h2 className="main-section-title"><span>Recent Blog Posts</span></h2>

            <div className='blog-card-container'>
              {posts.map((post, index) => (
                <BlogCard blog_snippet={post} key={index} />
              ))}
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

export default Home

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
      posts: posts.sort(sortByDate).slice(0, 3)
    }
  }
}