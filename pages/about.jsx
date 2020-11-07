import { readFile as readFileFs } from 'fs';
import { join } from 'path'
import { promisify } from 'util'
import Link from 'next/link'

const readFile = promisify(readFileFs);

export default function About({ name }) {
  return (
    <>
      <h1>About {name}</h1>
      <Link href="/blog">
        <a>Blog</a>
      </Link> 
    </>
  )
}

export async function getServerSideProps({ req, res, resolvedUrl }) {
  //console.log(req, res, resolvedUrl, join(__dirname, '../src/data/data.json'));
  const file = await readFile(join(process.cwd(), 'src/data/data.json'), 'utf8');
  const data = (file && JSON.parse(file)) ?? {};
  return {
    props: { ...data }
  }
}