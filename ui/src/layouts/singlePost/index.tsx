import Editor from '@components/editor'


interface SinglePostLayoutType {
  isAdmin?: boolean;
}
const SinglePostLayout = ({isAdmin=false}:SinglePostLayoutType) => {
  return (
    <>
      <Editor readOnly={!isAdmin} />
    </>
  );
}

export default SinglePostLayout