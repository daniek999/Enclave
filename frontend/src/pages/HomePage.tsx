// pages/HomePage.tsx
import { useEffect, useState } from "react";
import { Loading } from "../components/common/Loading";
import { Empty } from "../components/common/Empty";
import type { PostItem, PostPagination, PostQuery } from "../types/post.type";
import { postApi } from "../apis/post.api";
import { PostCard } from "../components/post/PostCard";
import type { TagItem } from "../types/tag.type";
import { tagApi } from "../apis/tag.api";
import { globalAPI } from "../apis/global.api";
import type { GlobalCount } from "../types/global.type";
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */

export default function HomePage() {
  // Hooks
  const { listTags } = tagApi();
  const { listPosts } = postApi();
  const { listActiveStatistics } = globalAPI();

  // States
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [tags, setTags] = useState<TagItem[]>([]);
  const [stats, setStats] = useState<GlobalCount>();
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<PostPagination>({
    limit: 0,
    page: 0,
    totalItems: 0,
    totalPages: 0,
  });
  const [search, setSearch] = useState<PostQuery>({
    limit: 10,
    page: 1,
    status: "active",
    tagId: undefined,
    title: undefined,
  });

  // Functions
  async function fetchPosts() {
    try {
      setLoading(true);
      const res = await listPosts(search);
      setPosts(res.data.items);
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
  async function fetchStats() {
    try {
      setLoading(true);
      const res = await listActiveStatistics();
      setStats(res.data.counts);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchPosts();
    fetchTags();
    fetchStats();
  }, [search]);

  // Renders
  if (loading) {
    return <Loading message="Cargando" />;
  }
  return (
    <div className="row g-0 gap-md-4">
      <section className="col-md-3 d-flex flex-column">
        {/* Tags */}
        {tags.length === 0 ? (
          <Empty message="No hay etiquetas existentes." />
        ) : (
          <div className="d-flex flex-column gap-1">
            <h5 className="mb-0 fw-bold">Categorias</h5>
            {tags.map((tag) => (
              <TagCard
                key={tag.id}
                tag={tag}
                action={() =>
                  setSearch((prev) => ({
                    ...prev,
                    page: 1,
                    tagId: tag.id,
                  }))
                }
              />
            ))}
          </div>
        )}
        {/* Separator */}
        <hr className="my-4 hr-surface" />
        {/* Stats */}
        {!stats ? (
          <Empty message="No hay estadisticas que mostrar." />
        ) : (
          <div className="d-flex flex-column gap-1">
            <h5 className="mb-0 fw-bold">Estadísticas</h5>
            <StatCard stat={stats} />
          </div>
        )}
        {/* Separator */}
        <hr className="my-4 hr-surface" />
      </section>
      <section className="col-md d-flex flex-column gap-4">
        {/* Title */}
        <h5 className="mb-0 fw-bold">Publicaciones</h5>
        {/* Panel */}
        <div className="d-flex flex-column flex-md-row justify-content-between gap-3">
          <div className="d-flex flex-row gap-2 w-100 justify-content-center align-items-center">
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
              className="form-control form-control-sm small rounded-0 flex-grow-1"
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
              {search.page} / {pagination.totalPages}
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
        {/* Posts */}
        {posts.length === 0 ? (
          <Empty message="No hay posts existentes" />
        ) : (
          <div className="d-flex flex-column gap-4">
            {/* Content */}
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export function TagCard({ tag, action }: { tag: TagItem; action: () => void }) {
  return (
    <p
      className="small mb-0 fg-primary lk-primary"
      style={{ cursor: "pointer" }}
      onClick={action}
    >
      /{tag.name}/
    </p>
  );
}

export function StatCard({ stat }: { stat: GlobalCount }) {
  return (
    <div className="d-flex flex-column gap-1">
      <p className="small mb-0 fg-partial">Usuarios {stat!.activeUsers}</p>
      <p className="small mb-0 fg-partial">Publicaciones {stat!.activePosts}</p>
      <p className="small mb-0 fg-partial">
        Comentarios {stat!.activeComments}
      </p>
      <p className="small mb-0 fg-partial">Categorias {stat!.activeTags}</p>
    </div>
  );
}
