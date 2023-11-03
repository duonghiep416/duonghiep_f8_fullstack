import { handleLogic } from "../../assets/js/script";

export default async function getProductList() {
    const { data } = await handleLogic.getListProduct({ limit: 8 });
    return data;
}
