// pages/HomePage.tsx
import { useEffect, useState } from "react";
import { Loading } from "../components/common/Loading";
import { Empty } from "../components/common/Empty";
import type {
  PostCount,
  PostItem,
  PostPagination,
  PostQuery,
} from "../types/post.type";
import { postApi } from "../apis/post.api";
import { PostCard } from "../components/post/PostCard";
import type { TagItem } from "../types/tag.type";
import { tagApi } from "../apis/tag.api";

export default function HomePage() {
  // Hooks
  const { listTags } = tagApi();
  const { listPosts } = postApi();

  // States
  /* Items */
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [tags, setTags] = useState<TagItem[]>([]);
  /* State */
  const [loading, setLoading] = useState(true);
  /* Meta */
  const [count, setCount] = useState<PostCount>({
    total: 0,
    active: 0,
    archived: 0,
    removed: 0,
  });
  const [pagination, setPagination] = useState<PostPagination>({
    limit: 0,
    page: 0,
    totalItems: 0,
    totalPages: 0,
  });
  /* Query */
  const [search, setSearch] = useState<PostQuery>({
    limit: 10,
    page: 1,
    status: "active",
    tagId: undefined,
    title: undefined,
  });

  // Handlers
  async function fetchPosts() {
    try {
      setLoading(true);
      const res = await listPosts(search);
      setPosts(res.data.items);
      setCount(res.data.counts);
      setPagination(res.data.pagination);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  async function fetchTags() {
    try {
      setLoading(true);
      const res = await listTags(1, 20, "active");
      setTags(res.data.items);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchPosts();
    fetchTags();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  // Renders
  if (loading) {
    return <Loading />;
  }
  if (tags.length == 0) {
    return <Empty message="No existen etiquetas." />;
  }
  if (posts.length == 0) {
    return <Empty message="No existen publicaciones." />;
  }
  return (
    <div className="row g-0 gap-md-4">
      <section className="col-md-3 d-flex flex-column">
        {/* Tags */}
        <div className="d-flex flex-column gap-1">
          <p className="mb-0">Categorias</p>
          {tags.map((tag) => (
            <p
              key={tag.id}
              className="small mb-0 fg-primary lk-primary"
              style={{ cursor: "pointer" }}
              onClick={() =>
                setSearch((prev) => ({
                  ...prev,
                  page: 1,
                  tagId: tag.id,
                }))
              }
            >
              /{tag.name}
            </p>
          ))}
        </div>
        {/* Separator */}
        <hr className="my-4 hr-surface" />
        {/* Statistics */}
        <div className="d-flex flex-column gap-1">
          <p className="mb-0">Estadísticas</p>
          <p className="small mb-0 fg-partial">{count.active} posts activos</p>
          <p className="small mb-0 fg-partial">
            {count.archived} posts archivados
          </p>
          <p className="small mb-0 fg-partial">
            {count.removed} posts removidos
          </p>
        </div>
        {/* Separator */}
        <hr className="my-4 hr-surface" />
      </section>
      <section className="col-md d-flex flex-column">
        {/* Panel */}
        <div className="d-flex flex-column flex-md-row justify-content-between gap-3">
          <div className="d-flex flex-row gap-2 w-100 justify-content-center justify-content-md-start">
            <button
              className="btn btn-outline-light btn-sm rounded-0"
              onClick={() =>
                setSearch({
                  limit: 10,
                  page: 1,
                  status: undefined,
                  tagId: undefined,
                  title: undefined,
                })
              }
            >
              <i className="ri-loop-left-fill"></i>
            </button>
            <input
              type="text"
              className="form-control form-control-sm small rounded-0 flex-grow-1 flex-md-grow-0"
              style={{ maxWidth: "250px" }} // Opcional: para que no sea infinito en desktop
              placeholder="Buscar..."
              value={search.title ?? ""}
              onChange={(e) =>
                setSearch((prev) => ({
                  ...prev,
                  title: e.target.value || undefined,
                }))
              }
              id="post-title"
            />
            <button
              className="btn btn-outline-light btn-sm rounded-0"
              onClick={() =>
                setSearch((prev) => ({
                  ...prev,
                  page: 1,
                }))
              }
            >
              <i className="ri-search-2-line"></i>
            </button>
          </div>
          <div className="d-flex flex-row gap-2 w-100 justify-content-center justify-content-md-end align-items-center">
            <button
              className="btn btn-outline-light btn-sm rounded-0"
              disabled={search.page <= 1}
              onClick={() =>
                setSearch((prev) => ({
                  ...prev,
                  page: prev.page - 1,
                }))
              }
            >
              <i className="ri-arrow-left-long-line"></i>
            </button>
            <span className="small text-nowrap">
              Pág. {search.page} de {pagination.totalPages}
            </span>
            <button
              className="btn btn-outline-light btn-sm rounded-0"
              disabled={search.page >= pagination.totalPages}
              onClick={() =>
                setSearch((prev) => ({
                  ...prev,
                  page: prev.page + 1,
                }))
              }
            >
              <i className="ri-arrow-right-long-line"></i>
            </button>
          </div>
        </div>
        {/* Separator */}
        <hr className="my-4 hr-surface" />
        {/* Posts */}
        <div className="d-flex flex-column gap-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
