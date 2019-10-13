import React from 'react';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import { Navbar } from 'components';
import { SiteMetaData } from 'types/site-meta-data';
import { ChildrenProp } from 'types/children-prop';

import './all.scss';

export type LayoutProps = { slug?: string } & ChildrenProp<JSX.Element>;

export const Layout: React.FC<LayoutProps> = React.memo(
    ({ slug, children }) => (
        <StaticQuery
            query={graphql`
                query HeadingQuery {
                    site {
                        siteMetadata {
                            title
                            description
                            siteUrl
                            socialLinks {
                                github {
                                    url
                                    name
                                }
                                devto {
                                    url
                                    name
                                }
                                twitter {
                                    url
                                    name
                                    userName
                                }
                                instagram {
                                    url
                                    name
                                }
                                stackoverflow {
                                    url
                                    name
                                }
                                linkedin {
                                    url
                                    name
                                }
                            }
                        }
                    }
                }
            `}
            render={(data: { site: { siteMetadata: SiteMetaData } }) => (
                <div>
                    <Helmet>
                        <html lang="en" />
                        <title>{data.site.siteMetadata.title}</title>
                        <meta
                            name="description"
                            content={data.site.siteMetadata.description}
                        />

                        <link
                            rel="apple-touch-icon"
                            sizes="180x180"
                            href="/img/apple-touch-icon.png"
                        />
                        <link
                            rel="icon"
                            type="image/png"
                            href="/img/favicon-32x32.png"
                            sizes="32x32"
                        />
                        <link
                            rel="icon"
                            type="image/png"
                            href="/img/favicon-16x16.png"
                            sizes="16x16"
                        />

                        <meta name="theme-color" content="#fff" />
                        <meta
                            property="og:title"
                            content={data.site.siteMetadata.title}
                        />
                        <meta property="og:url" content="/" />
                        <meta property="og:image" content="/img/og-image.jpg" />
                        <meta
                            name="twitter:site"
                            content={
                                data.site.siteMetadata.socialLinks.twitter
                                    .userName
                            }
                        />
                        <meta
                            name="twitter:creator"
                            content={
                                data.site.siteMetadata.socialLinks.twitter
                                    .userName
                            }
                        />
                        <meta
                            name="twitter:card"
                            content="summary_large_image"
                        />
                        {slug ? (
                            <meta
                                name="twitter:image"
                                content={`${data.site.siteMetadata.siteUrl}${slug}twitter-card.jpg`}
                            />
                        ) : null}
                    </Helmet>
                    <Navbar siteMetadata={data.site.siteMetadata} />
                    <div>{children}</div>
                </div>
            )}
        />
    ),
);

Layout.displayName = 'Layout';
