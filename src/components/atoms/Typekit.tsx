import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Helmet from 'react-helmet'

const TypekitScript = (typekitID: string) => (
  <script>
    {`
        (function(d) {
            var config = {
                kitId: '${typekitID}',
                scriptTimeout: 3000,
                async: true
            },
            h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
        })(document);
    `}
  </script>
)

const query = graphql`
  query {
    site {
      siteMetadata {
        typekitID
      }
    }
  }
`

export default function Typekit() {
  const data = useStaticQuery(query)
  const { typekitID } = data.site.siteMetadata

  return (
    typekitID && (
      <Helmet>
        <link rel="dns-prefetch" href="https://use.typekit.net/" />
        <link rel="dns-prefetch" href="https://p.typekit.net/" />

        {TypekitScript(typekitID)}
      </Helmet>
    )
  )
}
