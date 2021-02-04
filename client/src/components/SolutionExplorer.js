import { Atom, useAtom } from '@dbeining/react-atom';
import { Tree, Typography } from 'antd';
import { Store_SolutionExplorer } from '../stores/globalstore';
const { DirectoryTree } = Tree;

const SolutionExplorer = () => {
    const seAtom = useAtom(Store_SolutionExplorer);
    const treeData = seAtom.items;
  const onSelect = (keys, info) => {
    console.log('Trigger Select', keys, info);
  };

  const onExpand = () => {
    console.log('Trigger Expand');
  };

  return (
    <>
    <Typography variant="h3">Solution Explorer</Typography>
    <DirectoryTree
      multiple
      defaultExpandAll
      onSelect={onSelect}
      onExpand={onExpand}
      treeData={treeData}
      className="solution-explorer"
      style={{border: '1px solid rgba(255,255,255,0.1)', width:'100%', height: '100%',minWidth:'200px'}}
    />
    </>
  );
};

export default SolutionExplorer;