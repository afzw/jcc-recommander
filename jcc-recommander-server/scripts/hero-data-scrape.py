import asyncio
from os.path import join
from playwright.async_api import async_playwright

# url
heroDetailBaseUrl = "https://jcc.qq.com/#/heroDetail"
editionUrl = "13,S14,14.4.24"
oneStarHeroIdStart = 1241
oneStarHeroIdEnd =1254
twoStarHeroIdStart = 2335
twoStarHeroIdEnd = 2347
threeStarHeroIdStart = 3250
threeStarHeroIdEnd = 3264
fourStarHeroIdStart = 4240
fourStarHeroIdEnd = 4254
fiveStarHeroIdStart = 5210
fiveStarHeroIdEnd = 5218
sixStarHeroIdStart = 6001
sixStarHeroIdEnd = 6003

async def fetch_hero_data():
    async with async_playwright() as p:
        # 启动 Chromium 浏览器
        browser = await p.chromium.launch(headless=True)  # headless=True 意味着无头浏览器（后台运行）
        page = await browser.new_page()

        await fetchData(oneStarHeroIdStart, oneStarHeroIdEnd, page)
        await fetchData(twoStarHeroIdStart, twoStarHeroIdEnd, page)
        await fetchData(threeStarHeroIdStart, threeStarHeroIdEnd, page)
        await fetchData(fourStarHeroIdStart, fourStarHeroIdEnd, page)
        await fetchData(fiveStarHeroIdStart, fiveStarHeroIdEnd, page)
        await fetchData(sixStarHeroIdStart, sixStarHeroIdEnd, page)

        # 关闭浏览器
        await browser.close()

async def fetchData(start, end, page):
    for i in range(start, end + 1):
        url = join(heroDetailBaseUrl, editionUrl, str(i))

        # 访问目标网页
        await page.goto(url)

        # 等待网页内容加载完成（具体可以根据实际情况等待合适的元素加载）
        # 跳过一些不合法的页面
        try:
            await page.wait_for_selector(".hero-detail-wrap", timeout = 300)
        except TimeoutError:
            continue
        except Exception as e:
            continue

        heroDetails = await page.query_selector(".hero-detail-wrap")

        # 打印英雄信息
        namePart = await heroDetails.query_selector(".name")
        centerPart = await heroDetails.query_selector(".center")
        rightPart = await heroDetails.query_selector(".right")
        name_ = await namePart.inner_text()
        name = name_.replace(" ", "")
        bondParts = await rightPart.query_selector_all(".skill-name")
        bonds = ""
        for b in bondParts:
            bond_ = await b.inner_text()
            bonds += bond_.replace(" ", "") + ","
        bonds = bonds[:-1]
        avatar = await centerPart.eval_on_selector("img", "el => el.src")

        print(name, bonds, avatar)


asyncio.run(fetch_hero_data())