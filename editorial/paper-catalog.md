# AI 论文目录（AI 研发前沿周报）

AI 研发前沿周报（原 AI 架构周报，2026-09-30 改名）的论文资料库，规则见 [`ai-architecture.md`](./ai-architecture.md)。分三部分：论文从哪里找、AI 发展史重要论文汇总、本刊收录目录。可用浏览器或编辑器的查找功能按标题、机构、年份检索。

## 一、论文从哪里找（权威来源）

| 用途 | 来源 | 网址 | 说明 |
| --- | --- | --- | --- |
| 最新预印本 | arXiv | https://arxiv.org/list/cs.CL/recent 、https://arxiv.org/list/cs.LG/recent | 几乎所有 AI 论文首发于此；**预印本未经同行评审**，引用时注明 |
| 顶会评审与论文 | OpenReview | https://openreview.net | ICLR、NeurIPS 等的投稿、评审意见和接收结果 |
| 会议论文集 | NeurIPS 论文集 | https://proceedings.neurips.cc | NeurIPS 正式发表版本 |
| 会议论文集 | PMLR（ICML 等） | https://proceedings.mlr.press | ICML、AISTATS 等正式版本 |
| 会议论文集 | ACL Anthology | https://aclanthology.org | ACL、EMNLP、NAACL 等自然语言处理会议 |
| 会议论文集 | CVF Open Access | https://openaccess.thecvf.com | CVPR、ICCV 等计算机视觉会议 |
| 期刊 | JMLR、Nature Machine Intelligence | https://www.jmlr.org 、https://www.nature.com/natmachintell/ | 机器学习期刊；Nature、Science 也刊登重大成果 |
| 检索与引用 | Semantic Scholar、Google Scholar、DBLP | https://www.semanticscholar.org 、https://scholar.google.com 、https://dblp.org | 查引用数、作者、发表处；DBLP 核对正式出处最准 |
| 热度线索 | Hugging Face Papers | https://huggingface.co/papers | 社区每日热门论文，**只作线索**，须回到原文核实 |

**头部实验室官方研究页**（本刊重点跟踪）：

| 机构 | 网址 |
| --- | --- |
| Google DeepMind | https://deepmind.google/research/publications/ |
| Google Research | https://research.google/pubs/ |
| Anthropic | https://www.anthropic.com/research （可解释性研究另见 https://transformer-circuits.pub/ ） |
| OpenAI | https://openai.com/research/ |
| Meta AI（FAIR） | https://ai.meta.com/research/ |
| Microsoft Research | https://www.microsoft.com/en-us/research/ |
| NVIDIA Research | https://research.nvidia.com/publications |
| Apple Machine Learning Research | https://machinelearning.apple.com/research |
| DeepSeek | https://github.com/deepseek-ai |
| 通义千问 Qwen（阿里） | https://qwenlm.github.io/ |
| 字节跳动 Seed | https://seed.bytedance.com/ |

## 二、AI 发展史重要论文汇总（经典必读）

按发表时间排列，共 47 篇。「经典论文回顾」板块按序号依次讲，讲过的在「本刊回顾」一栏填入本站链接。原文链接均已核对（arXiv 编号经 arXiv 接口核对标题，期刊论文经 Crossref 核对 DOI，2026-09-30）。「发表处」写正式发表的会议或期刊；只有预印本或技术报告的照实写。

| 序号 | 年份 | 论文（英文原题 / 中文译名） | 作者 / 机构 | 发表处 | 为什么重要 | 原文 | 本刊回顾 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 1950 | Computing Machinery and Intelligence / 计算机器与智能 | A. M. Turing（曼彻斯特大学） | Mind, 1950 | 提出「模仿游戏」（图灵测试），把「机器能否思考」变成可检验的问题 | https://doi.org/10.1093/mind/LIX.236.433 | https://rich-richer.github.io/p/ai-architecture/?date=2026-10-01#classic-paper-turing-computing-machinery-intelligence |
| 2 | 1958 | The Perceptron: A Probabilistic Model for Information Storage and Organization in the Brain / 感知机 | F. Rosenblatt（康奈尔航空实验室） | Psychological Review, 1958 | 第一个能从数据中学习的神经网络模型 | https://doi.org/10.1037/h0042519 | https://rich-richer.github.io/p/ai-architecture/?date=2026-10-05#classic-paper-rosenblatt-perceptron |
| 3 | 1986 | Learning Representations by Back-propagating Errors / 通过误差反向传播学习表示 | Rumelhart、Hinton、Williams | Nature, 1986 | 让多层神经网络可以训练的反向传播算法 | https://doi.org/10.1038/323533a0 |  |
| 4 | 1997 | Long Short-Term Memory / 长短期记忆网络（LSTM） | Hochreiter、Schmidhuber | Neural Computation, 1997 | 解决循环网络记不住长序列的问题，此后二十年语音与翻译的主力 | https://doi.org/10.1162/neco.1997.9.8.1735 |  |
| 5 | 1998 | Gradient-Based Learning Applied to Document Recognition / 基于梯度学习的文档识别（LeNet） | LeCun、Bottou、Bengio、Haffner（AT&T 实验室） | Proceedings of the IEEE, 1998 | 卷积神经网络走向实用（支票手写数字识别） | https://doi.org/10.1109/5.726791 |  |
| 6 | 2003 | A Neural Probabilistic Language Model / 神经概率语言模型 | Bengio 等（蒙特利尔大学） | JMLR, 2003 | 用神经网络和词向量做语言模型，是今天大语言模型的源头 | https://www.jmlr.org/papers/v3/bengio03a.html |  |
| 7 | 2006 | A Fast Learning Algorithm for Deep Belief Nets / 深度信念网络的快速学习算法 | Hinton、Osindero、Teh | Neural Computation, 2006 | 逐层预训练让深层网络可训练，开启「深度学习」复兴 | https://doi.org/10.1162/neco.2006.18.7.1527 |  |
| 8 | 2012 | ImageNet Classification with Deep Convolutional Neural Networks / 用深度卷积网络做 ImageNet 分类（AlexNet） | Krizhevsky、Sutskever、Hinton（多伦多大学） | NeurIPS 2012 | GPU 训练的深度网络大幅刷新图像识别纪录，引爆深度学习浪潮 | https://papers.nips.cc/paper/2012/hash/c399862d3b9d6b76c8436e924a68c45b-Abstract.html |  |
| 9 | 2013 | Efficient Estimation of Word Representations in Vector Space / 向量空间中词表示的高效估计（word2vec） | Mikolov 等（Google） | 预印本（ICLR 2013 研讨会） | 让「词向量」普及，词义可以做加减运算 | https://arxiv.org/abs/1301.3781 |  |
| 10 | 2014 | Generative Adversarial Networks / 生成对抗网络（GAN） | Goodfellow 等（蒙特利尔大学） | NeurIPS 2014 | 生成器与判别器对抗训练，开创现代生成模型 | https://arxiv.org/abs/1406.2661 |  |
| 11 | 2014 | Sequence to Sequence Learning with Neural Networks / 序列到序列学习 | Sutskever、Vinyals、Le（Google） | NeurIPS 2014 | 编码器-解码器框架，神经机器翻译的基础 | https://arxiv.org/abs/1409.3215 |  |
| 12 | 2014 | Neural Machine Translation by Jointly Learning to Align and Translate / 联合学习对齐与翻译的神经机器翻译（注意力机制） | Bahdanau、Cho、Bengio | ICLR 2015 | 首次提出注意力机制，是 Transformer 的直接前身 | https://arxiv.org/abs/1409.0473 |  |
| 13 | 2014 | Adam: A Method for Stochastic Optimization / Adam：一种随机优化方法 | Kingma、Ba | ICLR 2015 | 至今最常用的训练优化器 | https://arxiv.org/abs/1412.6980 |  |
| 14 | 2014 | Dropout: A Simple Way to Prevent Neural Networks from Overfitting / Dropout：防止过拟合的简单方法 | Srivastava、Hinton 等（多伦多大学） | JMLR, 2014 | 训练时随机丢弃神经元，成为标准正则化手段 | https://jmlr.org/papers/v15/srivastava14a.html |  |
| 15 | 2015 | Batch Normalization: Accelerating Deep Network Training by Reducing Internal Covariate Shift / 批归一化 | Ioffe、Szegedy（Google） | ICML 2015 | 显著加快并稳定深层网络训练 | https://arxiv.org/abs/1502.03167 |  |
| 16 | 2015 | Deep Residual Learning for Image Recognition / 深度残差学习（ResNet） | 何恺明等（微软亚洲研究院） | CVPR 2016 | 残差连接让上百层网络可训练，Transformer 也沿用了这一结构 | https://arxiv.org/abs/1512.03385 |  |
| 17 | 2015 | Human-level Control through Deep Reinforcement Learning / 通过深度强化学习达到人类水平的控制（DQN） | Mnih 等（DeepMind） | Nature, 2015（预印本 arXiv:1312.5602） | 一个模型直接从画面学会玩几十款雅达利游戏，深度强化学习起点 | https://doi.org/10.1038/nature14236 |  |
| 18 | 2016 | Mastering the Game of Go with Deep Neural Networks and Tree Search / 用深度神经网络和树搜索掌握围棋（AlphaGo） | Silver 等（DeepMind） | Nature, 2016 | 首次在围棋上击败职业棋手 | https://doi.org/10.1038/nature16961 |  |
| 19 | 2017 | Attention Is All You Need / 注意力就是你所需要的一切（Transformer） | Vaswani 等 8 人（Google） | NeurIPS 2017 | 提出 Transformer 架构，今天几乎所有大模型的基础 | https://arxiv.org/abs/1706.03762 | https://rich-richer.github.io/p/ai-architecture/?date=2026-09-28#classic-paper-attention-is-all-you-need |
| 20 | 2017 | Deep Reinforcement Learning from Human Preferences / 基于人类偏好的深度强化学习（RLHF） | Christiano 等（OpenAI、DeepMind） | NeurIPS 2017 | 用人类比较反馈训练奖励模型，是 ChatGPT 类对齐方法的源头 | https://arxiv.org/abs/1706.03741 |  |
| 21 | 2017 | Outrageously Large Neural Networks: The Sparsely-Gated Mixture-of-Experts Layer / 稀疏门控混合专家层（MoE） | Shazeer 等（Google） | ICLR 2017 | 每次只激活部分「专家」，让模型参数量大增而计算量不大增 | https://arxiv.org/abs/1701.06538 |  |
| 22 | 2018 | Improving Language Understanding by Generative Pre-Training / 通过生成式预训练提升语言理解（GPT-1） | Radford 等（OpenAI） | 技术报告，2018 | 确立「先大规模预训练、再微调」的 GPT 路线 | https://cdn.openai.com/research-covers/language-unsupervised/language_understanding_paper.pdf |  |
| 23 | 2018 | BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding / BERT：双向 Transformer 预训练 | Devlin 等（Google） | NAACL 2019 | 双向预训练刷新多项语言理解任务，深刻影响搜索 | https://arxiv.org/abs/1810.04805 |  |
| 24 | 2019 | Language Models are Unsupervised Multitask Learners / 语言模型是无监督的多任务学习者（GPT-2） | Radford 等（OpenAI） | 技术报告，2019 | 展示规模扩大后模型不经专门训练也能完成多种任务 | https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf |  |
| 25 | 2019 | Exploring the Limits of Transfer Learning with a Unified Text-to-Text Transformer / 统一文本到文本的迁移学习（T5） | Raffel 等（Google） | JMLR, 2020 | 把所有语言任务统一成「文本进、文本出」 | https://arxiv.org/abs/1910.10683 |  |
| 26 | 2020 | Scaling Laws for Neural Language Models / 神经语言模型的规模定律 | Kaplan 等（OpenAI） | 预印本 | 发现性能随参数、数据、算力按幂律提升，成为大模型投资的理论依据 | https://arxiv.org/abs/2001.08361 |  |
| 27 | 2020 | Language Models are Few-Shot Learners / 语言模型是小样本学习者（GPT-3） | Brown 等（OpenAI） | NeurIPS 2020 | 1750 亿参数模型展示「给几个例子就会做」的上下文学习能力 | https://arxiv.org/abs/2005.14165 |  |
| 28 | 2020 | Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks / 检索增强生成（RAG） | Lewis 等（Facebook AI Research） | NeurIPS 2020 | 先检索资料再生成回答，企业知识库问答的基础方法 | https://arxiv.org/abs/2005.11401 |  |
| 29 | 2020 | Denoising Diffusion Probabilistic Models / 去噪扩散概率模型（DDPM） | Ho、Jain、Abbeel（加州大学伯克利分校） | NeurIPS 2020 | 扩散模型成熟的标志，此后图像生成的主流方法 | https://arxiv.org/abs/2006.11239 |  |
| 30 | 2020 | An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale / 一张图值 16×16 个词（ViT） | Dosovitskiy 等（Google） | ICLR 2021 | 把 Transformer 用到图像，统一了视觉与语言架构 | https://arxiv.org/abs/2010.11929 |  |
| 31 | 2021 | Learning Transferable Visual Models From Natural Language Supervision / 从自然语言监督中学习可迁移的视觉模型（CLIP） | Radford 等（OpenAI） | ICML 2021 | 图文对齐训练，多模态与文生图的关键组件 | https://arxiv.org/abs/2103.00020 |  |
| 32 | 2021 | Switch Transformers: Scaling to Trillion Parameter Models with Simple and Efficient Sparsity / Switch Transformer：用简单高效的稀疏性扩展到万亿参数 | Fedus、Zoph、Shazeer（Google） | JMLR, 2022 | 简化混合专家路由，推动 MoE 进入主流大模型 | https://arxiv.org/abs/2101.03961 |  |
| 33 | 2021 | LoRA: Low-Rank Adaptation of Large Language Models / LoRA：大语言模型的低秩适配 | Hu 等（微软） | ICLR 2022 | 只训练很少的参数就能微调大模型，大幅降低定制成本 | https://arxiv.org/abs/2106.09685 |  |
| 34 | 2021 | Highly Accurate Protein Structure Prediction with AlphaFold / 用 AlphaFold 高精度预测蛋白质结构 | Jumper 等（DeepMind） | Nature, 2021 | 解决蛋白质结构预测难题，AI for Science 的里程碑 | https://doi.org/10.1038/s41586-021-03819-2 |  |
| 35 | 2021 | High-Resolution Image Synthesis with Latent Diffusion Models / 潜空间扩散模型（Stable Diffusion 的基础） | Rombach 等（慕尼黑大学、海德堡大学、Runway） | CVPR 2022 | 在压缩后的潜空间做扩散，让文生图能在普通显卡上运行 | https://arxiv.org/abs/2112.10752 |  |
| 36 | 2022 | Chain-of-Thought Prompting Elicits Reasoning in Large Language Models / 思维链提示激发大模型推理 | Wei 等（Google） | NeurIPS 2022 | 让模型先写出推理步骤，显著提升数学与逻辑题表现 | https://arxiv.org/abs/2201.11903 |  |
| 37 | 2022 | Training Language Models to Follow Instructions with Human Feedback / 用人类反馈训练语言模型遵循指令（InstructGPT） | Ouyang 等（OpenAI） | NeurIPS 2022 | 把 RLHF 用到大模型，是 ChatGPT 的直接技术前身 | https://arxiv.org/abs/2203.02155 |  |
| 38 | 2022 | Training Compute-Optimal Large Language Models / 训练算力最优的大语言模型（Chinchilla） | Hoffmann 等（DeepMind） | NeurIPS 2022 | 修正规模定律：同样算力下应多用数据、少堆参数 | https://arxiv.org/abs/2203.15556 |  |
| 39 | 2022 | FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness / FlashAttention：考虑读写的快速省显存注意力 | Dao 等（斯坦福大学） | NeurIPS 2022 | 从硬件读写角度重写注意力计算，长上下文训练与推理的基础设施 | https://arxiv.org/abs/2205.14135 |  |
| 40 | 2022 | ReAct: Synergizing Reasoning and Acting in Language Models / ReAct：让语言模型推理与行动协同 | Yao 等（普林斯顿大学、Google） | ICLR 2023 | 「思考—调用工具—观察」循环，AI 智能体的基本范式 | https://arxiv.org/abs/2210.03629 |  |
| 41 | 2022 | Constitutional AI: Harmlessness from AI Feedback / 宪法式 AI：来自 AI 反馈的无害性 | Bai 等（Anthropic） | 预印本 | 用一组书面原则让 AI 自我批评和改进，减少对人工标注的依赖 | https://arxiv.org/abs/2212.08073 |  |
| 42 | 2023 | LLaMA: Open and Efficient Foundation Language Models / LLaMA：开放高效的基础语言模型 | Touvron 等（Meta AI） | 预印本 | 开放权重大模型浪潮的起点 | https://arxiv.org/abs/2302.13971 |  |
| 43 | 2023 | Toolformer: Language Models Can Teach Themselves to Use Tools / Toolformer：语言模型自学使用工具 | Schick 等（Meta AI） | NeurIPS 2023 | 模型自己学会何时调用计算器、搜索等外部工具 | https://arxiv.org/abs/2302.04761 |  |
| 44 | 2023 | Direct Preference Optimization: Your Language Model is Secretly a Reward Model / 直接偏好优化（DPO） | Rafailov 等（斯坦福大学） | NeurIPS 2023 | 不训练奖励模型也能做偏好对齐，大幅简化 RLHF | https://arxiv.org/abs/2305.18290 |  |
| 45 | 2023 | Towards Monosemanticity: Decomposing Language Models With Dictionary Learning / 迈向单义性：用字典学习分解语言模型 | Anthropic 可解释性团队 | 研究报告（Transformer Circuits） | 把神经元混杂的信号拆成可理解的「特征」，机制可解释性的代表作 | https://transformer-circuits.pub/2023/monosemantic-features/index.html |  |
| 46 | 2023 | Mamba: Linear-Time Sequence Modeling with Selective State Spaces / Mamba：选择性状态空间的线性时间序列建模 | Gu（卡内基梅隆大学）、Dao（普林斯顿大学） | 预印本 | 以线性复杂度处理长序列，Transformer 之外最受关注的架构 | https://arxiv.org/abs/2312.00752 |  |
| 47 | 2025 | DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning / DeepSeek-R1：用强化学习激发大模型推理能力 | DeepSeek-AI | 预印本 | 公开以强化学习训练推理模型的方法并开放权重，推动推理模型普及 | https://arxiv.org/abs/2501.12948 |  |

> 已讲：序号 19（2026-09-28）、序号 1（2026-10-01）、序号 2（2026-10-05），本刊条目见第三部分。

## 三、本刊收录目录

由每期出刊后追加。按主题分组；同一篇论文只收一次，后续提及时在「本刊条目」一栏追加链接。

- 「状态」写：预印本（arXiv 编号）或正式发表的会议 / 期刊名称与年份。
- 「本刊条目」写该论文所在期的事件编号（本站链接，见 [`README.md`](./README.md) 第 10 节）。

| 主题 | 论文（英文原题 / 中文译名） | 作者机构 | 发表日期 | 状态 | 原文 | 本刊条目 |
| --- | --- | --- | --- | --- | --- | --- |
| 架构 / 机制解释 | Your Transformer Can Hold Two Thoughts at Once: Evidence of Linear Superposition in LLMs / Transformer 可同时持有两路思路：LLM 中线性叠加现象的证据 | 论文未标注机构；据公开资料，作者之一 Ivan Oseledets 为 Skoltech 教授、AIRI 科学委员会成员 | 2026-09-24 | 预印本（arXiv:2609.29845） | https://arxiv.org/abs/2609.29845 | https://rich-richer.github.io/p/ai-architecture/?date=2026-09-28#transformer-linear-superposition-two-thoughts |
| 训练与后训练 | Rufus-Air: An Open LLM Post-Training Recipe / Rufus-Air：一份开放的 LLM 后训练方案 | Amazon（23 位作者） | 2026-09-24（v2 2026-09-25） | 预印本（arXiv:2609.29421） | https://arxiv.org/abs/2609.29421 | https://rich-richer.github.io/p/ai-architecture/?date=2026-09-28#amazon-rufus-air-post-training-recipe |
| 经典论文 · 架构奠基 | Attention Is All You Need / 注意力就是你所需要的一切 | Google Brain / Google Research（Vaswani、Shazeer、Parmar 等 8 人；Gomez 以多伦多大学实习生身份参与） | 2017-06-12（NeurIPS 2017 正式发表） | 正式发表（NeurIPS 2017） | https://arxiv.org/abs/1706.03762 | https://rich-richer.github.io/p/ai-architecture/?date=2026-09-28#classic-paper-attention-is-all-you-need |
| 智能体 / 上下文管理 | Context Language Models / 上下文语言模型 | Meta 超级智能实验室、华盛顿大学（另有 MIT、Trillium Labs），13 人 | 2026-09-29 | 预印本（arXiv:2609.37725） | https://arxiv.org/abs/2609.37725 | https://rich-richer.github.io/p/ai-architecture/?date=2026-10-01#meta-context-language-models |
| 训练与后训练 / 智能体强化学习系统 | QwenGyre: An Elastic Reinforcement Learning Framework for Training xLong-Horizon Agents / QwenGyre：超长时程智能体的弹性强化学习框架 | 阿里巴巴 Token Hub（另有中国科学技术大学、清华大学），12 人 | 2026-09-27 | 预印本（arXiv:2609.33848） | https://arxiv.org/abs/2609.33848 | https://rich-richer.github.io/p/ai-architecture/?date=2026-10-01#qwengyre-elastic-rl-xlong-horizon-agents |
| 架构 / 长上下文稀疏注意力 | Block Sparse Attention with Log-Linear Complexity / 对数线性复杂度的块稀疏注意力（PISA） | 上海交通大学、上海创智学院、字节跳动 Seed，5 人 | 2026-09-25 | 预印本（arXiv:2609.31093） | https://arxiv.org/abs/2609.31093 | https://rich-richer.github.io/p/ai-architecture/?date=2026-10-01#seed-pisa-block-sparse-attention-log-linear |
| 预训练 / 多模态规模定律 | How Far Are We from Removing the Visual Encoder? Scaling Laws for Encoder-Free Multimodal Pretraining / 离去掉视觉编码器还有多远？无编码器多模态预训练的规模定律 | 腾讯基础模型部门、中国科学院自动化研究所、中国科学院大学 | 2026-09-28 | 预印本（arXiv:2609.35457） | https://arxiv.org/abs/2609.35457 | https://rich-richer.github.io/p/ai-architecture/?date=2026-10-01#tencent-encoder-free-mllm-scaling-laws |
| 训练与后训练 / 数据筛选 | Selecting Diverse SFT Traces Improves Post-RL Generalization / 选择多样的监督微调推理轨迹可提升强化学习后的泛化 | Google（一作为伊利诺伊大学厄巴纳-香槟分校学生，工作在 Google 完成），3 人 | 2026-09-27 | 预印本（arXiv:2609.33780） | https://arxiv.org/abs/2609.33780 | https://rich-richer.github.io/p/ai-architecture/?date=2026-10-01#google-diverse-sft-traces-post-rl |
| 经典论文 · AI 思想起点 | Computing Machinery and Intelligence / 计算机器与智能 | A. M. Turing（曼彻斯特大学） | 1950-10 | 正式发表（Mind 第 59 卷第 236 期，433–460 页） | https://doi.org/10.1093/mind/LIX.236.433 | https://rich-richer.github.io/p/ai-architecture/?date=2026-10-01#classic-paper-turing-computing-machinery-intelligence |
| 训练系统 / MoE 训练基础设施 | Supercharging Olmo-core for Efficient and Scalable MoE Training / 为高效、可扩展的 MoE 训练升级 Olmo-core | Allen Institute for AI、华盛顿大学（一作 Tianhua Tao 等） | 2026-10-01（报告署 2026-10） | 技术报告（Ai2，未见 arXiv 版本） | https://allenai.org/papers/olmocore3 | https://rich-richer.github.io/p/ai-architecture/?date=2026-10-05#ai2-olmo-core-3-moe-training-stack |
| 训练与后训练 / 测试时扩展 | Sharpening Tax in Post-Training / 后训练中的锐化税 | Meta 超级智能实验室、威斯康星大学麦迪逊分校、纽约大学、斯坦福大学，10 人 | 2026-10-01 | 预印本（arXiv:2610.01509） | https://arxiv.org/abs/2610.01509 | https://rich-richer.github.io/p/ai-architecture/?date=2026-10-05#meta-sharpening-tax-post-training-coverage |
| 智能体 / 测试时算力 | Mid-Harness: Scaling Actions Between Model and Harness for Terminal Agents / Mid-Harness：在模型与脚手架之间扩展动作 | 英伟达、韩国科学技术院（KAIST），11 人 | 2026-09-30 | 预印本（arXiv:2609.39982） | https://arxiv.org/abs/2609.39982 | https://rich-richer.github.io/p/ai-architecture/?date=2026-10-05#nvidia-mid-harness-terminal-agent-action-scaling |
| 推理 / KV 缓存压缩 | Periodic Weak Spots: Phase Sensitivity from Chunked KV-Cache Compression / 周期性弱点：分块 KV 缓存压缩的相位敏感性 | 字节跳动 Seed、普林斯顿大学、斯坦福大学、加州大学伯克利分校，8 人 | 2026-09-28 | 预印本（arXiv:2609.36322） | https://arxiv.org/abs/2609.36322 | https://rich-richer.github.io/p/ai-architecture/?date=2026-10-05#seed-periodic-weak-spots-kv-cache-phase |
| 后训练与对齐 / 诚实性 | Language Models Are "Insecure" Reporters / 语言模型是「不安全」的汇报者 | 麻省理工学院、Google Research、哈佛大学，8 人（两位高校作者工作在 Google Research 完成） | 2026-09-28 | 预印本（arXiv:2609.36139） | https://arxiv.org/abs/2609.36139 | https://rich-richer.github.io/p/ai-architecture/?date=2026-10-05#google-insecure-reporters-llm-honest-reporting |
| 智能体 / 脚手架消融 | How Much of a Harness Does a Strong Agent Need for Autonomous ML Engineering? / 强智能体做自主机器学习工程，究竟还需要多少脚手架？ | 洛桑联邦理工学院（EPFL）、Apple，3 人 | 2026-09-30 | 预印本（arXiv:2609.40303） | https://arxiv.org/abs/2609.40303 | https://rich-richer.github.io/p/ai-architecture/?date=2026-10-05#apple-epfl-minimal-harness-mle-agent |
| 架构 / 循环 Transformer | Improving Test-Time Scaling with Adaptive Looped Transformers / 用自适应循环 Transformer 改进测试时扩展（TaH2） | 清华大学、耶鲁大学，7 人 | 2026-09-28 | 预印本（arXiv:2609.35748） | https://arxiv.org/abs/2609.35748 | https://rich-richer.github.io/p/ai-architecture/?date=2026-10-05#tsinghua-tah2-adaptive-looped-transformer |
| 经典论文 · 神经网络起点 | The Perceptron: A Probabilistic Model for Information Storage and Organization in the Brain / 感知机：大脑中信息存储与组织的概率模型 | F. Rosenblatt（康奈尔航空实验室） | 1958 | 正式发表（Psychological Review 第 65 卷第 6 期，386–408 页） | https://doi.org/10.1037/h0042519 | https://rich-richer.github.io/p/ai-architecture/?date=2026-10-05#classic-paper-rosenblatt-perceptron |

> 首批条目从 2026-09-27 改版后的第一期 AI 研发前沿周报（原 AI 架构周报）（2026-09-28 出刊）开始收录（「本周重要论文」与「经典论文回顾」两个板块）。
