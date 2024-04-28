import 'vant/lib/index.css';
import {
    Tab,
    Tabs,
    Popup,
    Grid,
    GridItem,
    AddressEdit,
    AddressList,
    Icon,
    SubmitBar,
    Stepper,
    Checkbox,
    CheckboxGroup,
    SwipeCell,
    Notify,
    Field,
    Form,
    Tag,
    Button,
    Card,
    Swipe,
    SwipeItem,
    Lazyload,
    Badge,
    Collapse,
    CollapseItem,
    Sidebar,
    SidebarItem,
    Image as VanImage,
    Search,
    Tabbar,
    TabbarItem,
    NoticeBar,
    TreeSelect,
    NavBar,BackTop,CellGroup,Cell,Steps,Step,Divider,PullRefresh,List,Empty,Loading,Row,Col,TextEllipsis

} from 'vant'; 

let AddVantComponents = function(a:any) {
    a.use(Swipe).use(SwipeItem)
        .use(Badge).use(Collapse).use(CollapseItem).use(Sidebar).use(SidebarItem).use(Lazyload, { loading: require("@/assets/images/default.gif") })
        .use(Tab).use(Tabs).use(Card).use(VanImage)
        .use(Tag).use(Button).use(Form).use(Field).use(Notify).use(SwipeCell).use(Checkbox).use(CheckboxGroup).use(Stepper)
        .use(SubmitBar).use(Icon).use(AddressEdit).use(AddressList).use(Popup).use(Grid).use(Search).use(GridItem)
        .use(Tabbar).use(NoticeBar).use(TreeSelect).use(NavBar).use(BackTop).use(CellGroup).use(Cell)
        .use(Steps).use(Step).use(Divider).use(PullRefresh).use(List).use(Empty).use(Loading)
        .use(Row).use(Col).use(TextEllipsis)

        .use(TabbarItem);
}
export default AddVantComponents;