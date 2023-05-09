import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Home from "..";

const ProjectPage = () => {
    const router = useRouter();
    let { slug } = router.query;

    // check if slug is string
    if (typeof slug !== "string") {
        return <ErrorPage statusCode={404} />;
    } else {
        return <Home projectId={slug}></Home>;
    }
};

export default ProjectPage;
