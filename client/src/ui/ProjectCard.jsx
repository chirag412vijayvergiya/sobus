import { TbExternalLink } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

function ProjectCard({ elements }) {
  const navigate = useNavigate();
  return (
    <div class="card hover:to-gray-750 group relative m-4 mx-auto w-[clamp(260px,80%,300px)] cursor-pointer overflow-hidden rounded-lg border-r-2 border-t-2 border-green-500 bg-gradient-to-tl from-gray-100 to-green-300 text-gray-300 transition-all hover:from-green-400 hover:brightness-90 dark:border-gray-900 dark:from-green-950 dark:hover:from-green-800 dark:hover:to-green-950">
      <div class="px-8 py-10">
        <div class="mb-4 h-10 w-10 rounded-full rounded-tl-none bg-orange-500 transition-all group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-red-900">
          <button
            onClick={() => navigate(`/projects/${elements.id}`)}
            className="group relative p-2"
          >
            <TbExternalLink className="h-6 w-6 transform text-slate-800 transition-transform group-hover:scale-125" />
          </button>
        </div>
        <div class="text-xl font-bold uppercase text-grey-700 dark:text-grey-300">
          CHAMONILLE
        </div>
        <div class="uppercase tracking-widest text-gray-500 dark:text-gray-400">
          NATURAL, OIL
        </div>
        <div class="mt-8 text-gray-400">
          <p class="font-bold">39.00 MLC</p>
          <p>Perfect everywhere</p>
        </div>
      </div>

      <div class="absolute bottom-0 m-auto h-2 w-full rounded bg-gradient-to-l via-yellow-500 blur-2xl transition-all group-hover:blur-xl"></div>
      <div class="m-auto h-0.5 w-[70%] rounded bg-gradient-to-l via-yellow-950 transition-all group-hover:w-full group-hover:via-yellow-500"></div>
    </div>
  );
}

export default ProjectCard;
