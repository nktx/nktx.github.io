import React from "react"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="nktx.github.io" keywords={[`nktx`]} />
    <div className="profile-picture">
      <Image />
    </div>
    <p className="profile-name">Kent Yang</p>
    <p>Interaction Designer <a href="https://www.ibm.com/services/ibmix/" target="_blank" rel="noopener noreferrer">@IBM iX</a> based in Taipei, Taiwan.<br/>
    I recognize design as a method, a process, and a journey to build relationships.</p>
    <div className="profile-links"> 
      <a href="https://github.com/nktx" target="_blank" rel="noopener noreferrer">GitHub</a>{" | "}
      <a href="https://codepen.io/nktx" target="_blank" rel="noopener noreferrer">CodePen</a>{" | "}
      <a href="https://www.behance.net/nktx" target="_blank" rel="noopener noreferrer">Behance</a>{" | "}
      <a href="https://dribbble.com/nktx" target="_blank" rel="noopener noreferrer">Dribbble</a>{" | "}
      <a href="https://www.linkedin.com/in/khnkenny/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
    </div>
  </Layout>
)

export default IndexPage
