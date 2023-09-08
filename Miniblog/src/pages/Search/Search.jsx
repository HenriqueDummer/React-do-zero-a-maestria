import useFetchDocuments from '../../hooks/useFetchDocuments'
import useQuery from '../../hooks/useQuery'
import PostDetail from '../../components/PostDetail/PostDetail'

import { Link } from 'react-router-dom'

import styles from "./Search.module.css"

const Search = () => {
    const query = useQuery()
    const search = query.get("q")

    const {documents: posts} = useFetchDocuments("posts", search)
  return (
    <div className={styles.search}>
        <h1>Results for: "{search}"</h1>
        <div>
            {posts && posts.length === 0 && (
                <>
                    <p>No results found</p> 
                    <Link to={"/"} ><button>Voltar</button></Link>
                </>
            )}
            {posts && posts.map((post) =>(
                <PostDetail key={post.id} post={post} />
            ))}
        </div>
    </div>
  )
}

export default Search