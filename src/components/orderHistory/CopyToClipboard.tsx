'use client';

import { BsCopy } from 'react-icons/bs';

const CopyToClipBoard = (props: { pid: string }) => {
  return (
    <>
      <div className='flex items-center gap-2'>
        {props.pid}
        <button className='text-purple1' onClick={() => navigator.clipboard.writeText(props.pid)}>
          <BsCopy />
        </button>
      </div>
    </>
  );
};

export default CopyToClipBoard;
