
import { TagContainer } from "./style"
export type Props ={
    size?: 'small' | 'Big';
    children: React.ReactNode; 
}

const Tag = ({children, size = 'small'}: Props) => <TagContainer size={size}>{children}</TagContainer>


export default Tag