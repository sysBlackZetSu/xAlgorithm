function recoverSecret(triplets) {
    const chars = new Set();
    triplets.forEach(triplet => triplet.forEach(char => chars.add(char)));

    const graph = new Map();
    chars.forEach(char => graph.set(char, new Set()));

    triplets.forEach(triplet => {
        for (let i = 0; i < triplet.length - 1; i++) {
            const current = triplet[i];
            const next = triplet[i + 1];
            graph.get(current).add(next);
        }
    });

    const result = [];
    const visited = new Set();

    function dfs(char) {
        if (!visited.has(char)) {
            visited.add(char);
            graph.get(char).forEach(nextChar => dfs(nextChar));
            result.unshift(char);
        }
    }

    chars.forEach(char => dfs(char));
    return result.join('');
}

const triplets = [
    ["t", "u", "p"],
    ["w", "h", "i"],
    ["t", "s", "u"],
    ["a", "t", "s"],
    ["h", "a", "p"],
    ["t", "i", "s"],
    ["w", "h", "s"],
];

console.log(recoverSecret(triplets));
/**
 * 
Bước 1: Xây dựng tập hợp ký tự
Lặp qua mỗi triplet và thêm tất cả các ký tự vào một tập hợp (set). Điều này đảm bảo rằng chúng ta sẽ có tất cả các ký tự xuất hiện trong chuỗi kết quả.
Bước 2: Xây dựng đồ thị hướng
Tạo một đồ thị hướng (graph) với các ký tự là các node và có cạnh từ ký tự a đến b nếu a đứng trước b trong một triplet nào đó.
Ban đầu, các node sẽ không có cạnh nào đi vào hoặc đi ra.
Bước 3: Tìm chuỗi kết quả
Sử dụng thuật toán DFS (Depth First Search) để duyệt qua các node của đồ thị.
Bắt đầu từ một node không có cạnh đi vào (có nghĩa là không có triplet nào chứa node đó).
Khi duyệt qua một node, đệ quy vào các node kề và đánh dấu chúng là đã ghé thăm.
Khi không còn node nào kề nữa, thêm node hiện tại vào đầu chuỗi kết quả.
Lặp lại quá trình này cho tất cả các node trong tập hợp ký tự.
Bước 4: Trả về chuỗi kết quả
Kết hợp chuỗi kết quả từ các node đã sắp xếp.
 */
