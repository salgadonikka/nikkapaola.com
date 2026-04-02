import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

export async function GET(context) {
	const posts = await getCollection('blog', ({ data }) => !data.draft);
	return rss({
		title: "Nikka  Paola",
		description: "My little corner of the internet.",
		site: context.site,
		items: posts.map((post) => ({
			title: post.data.title,
      		pubDate: post.data.pubDate,
			link: `/blog/${post.id}/`,
		})),
	});
}
