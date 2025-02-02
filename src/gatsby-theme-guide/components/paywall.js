import React, { Fragment } from 'react'
import { Link } from 'gatsby'
import styled from '@emotion/styled'
import { Helmet } from 'react-helmet'

import { useUser } from '../../lib/useUser'
import { login } from '../../lib/auth'

const PAID_PATHS = [
  '/understanding-graphql/',
  '/query-language/',
  '/type-system/',
  '/validation-and-execution/',
  '/client/',
  '/react/',
  '/vue/',
  '/react-native/',
  '/ios/',
  '/android/',
  '/server/',
]

const PRO_PATHS = ['/ssr/', '/federation/', '/server-analytics/']

const FULL_PATHS = ['/service-integrations/', '/preventing-dos-attacks/']

const Hide = styled.div`
  height: ${(props) => (props.hide ? '1px' : 'auto')};
  overflow-y: hidden;
`

const Overlay = styled.div`
  height: 35vh;
`

const Login = styled.button`
  color: var(--gray500);
`

function dirMatches(dirs, pathname) {
  return dirs.some((dir) => pathname.startsWith(dir))
}

export const Paywall = ({
  pathname,
  children,
  header,
  title,
  image,
  description,
  conditionalRender,
}) => {
  const { user } = useUser()

  let message = null
  let hide = true

  const isIndex = PAID_PATHS.includes(pathname)
  const isBasic = dirMatches(PAID_PATHS, pathname)
  const isPro = dirMatches(PRO_PATHS, pathname)
  const isFull = dirMatches(FULL_PATHS, pathname)
  const matchesPaid = isBasic || isPro || isFull
  const isFreePath = pathname !== '/react/' && (isIndex || !matchesPaid)

  function canView() {
    if (user && user.hasPurchased) {
      switch (user.hasPurchased) {
        case 'BASIC':
          return isBasic
        case 'PRO':
        case 'TEAM':
          return isPro || isBasic
        case 'FULL':
        case 'FULLTEAM':
        case 'TRAINING':
          return true
        default:
          return isBasic
      }
    } else {
      return false
    }
  }

  if (isFreePath) {
    hide = false
  } else {
    if (canView()) {
      hide = false
    } else {
      let CTA = 'buy the book'
      if (isPro) {
        CTA = 'get the Pro package'
      } else if (isFull) {
        CTA = 'get the Full package'
      }

      message = (
        <Fragment>
          <p>
            To view this content, <Link to="/#pricing">{CTA}</Link>! 😃🙏
          </p>
          {user ? null : (
            <p>
              Or <Login onClick={login}>sign in</Login> if you’ve already
              purchased.
            </p>
          )}
        </Fragment>
      )
    }
  }

  if (conditionalRender) {
    if (hide) {
      return null
    } else {
      return children
    }
  }

  // display the header when hiding the page
  if (header) {
    if (hide) {
      // https://developers.google.com/search/docs/data-types/paywalled-content
      // https://schema.org/CreativeWork
      const json = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        headline: title,
        image,
        // datePublished: '2025-02-05T08:00:00+08:00',
        // dateModified: '2025-02-05T09:20:00+08:00',
        author: {
          '@type': 'Person',
          name: 'John Resig',
        },
        description,
        isAccessibleForFree: 'False',
        hasPart: {
          '@type': 'WebPageElement',
          isAccessibleForFree: 'False',
          cssSelector: '.paid-content',
        },
      })

      return (
        <Fragment>
          {children}
          <Helmet>
            <script type="application/ld+json">{json}</script>
          </Helmet>
        </Fragment>
      )
    } else {
      return null
    }
  }

  return (
    <Fragment>
      {message && <Overlay>{message}</Overlay>}
      <Hide hide={hide} className="paid-content">
        {children}
      </Hide>
    </Fragment>
  )
}
