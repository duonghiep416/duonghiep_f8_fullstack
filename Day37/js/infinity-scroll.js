let page = 0;
export async function fetchMoreData(query = {}) {
    const queryString = new URLSearchParams(query).toString();
    const { response, data } = await client.get(`/blogs?${queryString}`);

    if (page > data.length / limitPostInPage) {
        page = 0;
    }
}
