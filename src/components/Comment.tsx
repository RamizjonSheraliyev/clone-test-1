import Avatar from "@/components/Avatar";
import {Profile} from "@prisma/client";
import {format} from 'date-fns';

export default function Comment ({
  text,
  createdAt,
  authorProfile,
}:{
  text: string;
  createdAt: Date;
  authorProfile?: Profile;
}) {
  return (
    <div className="flex gap-2">
      <div>
        <Avatar src={authorProfile?.avatar || ''}/>
      </div>
      <div className="w-full">
        <div className="flex justify-between gap-2">
          <div>
            <h3 className="flex gap-1 dark:text-gray-300">
              {authorProfile?.name}
            </h3>
            <h4 className="text-gray-600 dark:text-gray-500 text-sm -mt-1">
              @{authorProfile?.username}
            </h4>
          </div>
        </div>
        <div>
          <div className="bg-gray-200 dark:bg-gray-700 border dark:border-0 dark:text-gray-400 border-gray-300 rounded-md p-4 mt-2">
            <p>
              {text}
            </p>
          </div>
          <div className="text-xs text-gray-400 text-right">
            {format(createdAt, 'yyyy-MM-dd HH:mm:ss')}
          </div>
        </div>
      </div>
    </div>
  );
}