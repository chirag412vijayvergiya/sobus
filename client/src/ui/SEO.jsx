import { Helmet } from 'react-helmet-async';

const SEO = ({
  title,
  description,
  keywords,
  author,
  lang = 'en',
  meta = [],
}) => {
  const defaultTitle = 'SOBUS';
  const defaultDescription = 'SOBUS: A social business platform';
  const defaultKeywords = 'social business, platform';
  const defaultAuthor = 'Chirag Vijayvergiya';

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title || defaultTitle}
      titleTemplate={title ? `%s | ${defaultTitle}` : defaultTitle}
      meta={[
        {
          name: 'description',
          content: description || defaultDescription,
        },
        {
          name: 'keywords',
          content: keywords || defaultKeywords,
        },
        {
          name: 'author',
          content: author || defaultAuthor,
        },
        ...meta,
      ]}
    />
  );
};

export default SEO;
