import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

const FeaturedPosts = ({ posts }) => {
  const vedette = useStaticQuery(graphql`
    {
      allMarkdownRemark(
        filter: { frontmatter: { templateKey: { eq: "en-vedette" } } }
      ) {
        edges {
          node {
            frontmatter {
              selection {
                post1
                post2
                post3
              }
            }
          }
        }
      }
    }
  `)
  const postlist = vedette.allMarkdownRemark.edges[0].node.frontmatter.selection
  const filtredPosts = posts.filter(edge => {
    if (edge.node.frontmatter.titre === postlist.post1) {
      return true
    }
    if (edge.node.frontmatter.titre === postlist.post2) {
      return true
    }
    if (edge.node.frontmatter.titre === postlist.post3) {
      return true
    }
    return false
  })

  return (
    <div className="featured-posts">
      {!!filtredPosts &&
        filtredPosts.map(post => {
          const { titre, description, coverture } = post.node.frontmatter
          const { slug } = post.node.fields
          return (
            <PostsBoxs
              key={`card_${post.node.id}`}
              titre={titre}
              description={description}
              coverture={coverture}
              slug={slug}
            />
          )
        })}
    </div>
  )
}

export default FeaturedPosts

export const PostsBoxs = ({ titre, description, coverture, slug }) => {
  return (
    <div
      className="post-box"
      style={{
        backgroundImage: `url(${
          !!coverture.childImageSharp
            ? coverture.childImageSharp.fluid.src
            : coverture
        })`,
      }}
    >
      <div className="over-box">
        <h3>{titre}</h3>
        <p>{description}</p>
      </div>
      <Link to={`/article/${slug}`}>
        <span>lire la suite &#8594;</span>
      </Link>
    </div>
  )
}
