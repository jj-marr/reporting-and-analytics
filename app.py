import json
import tkinter as tk
from tkinter import ttk, messagebox
from matplotlib.figure import Figure
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg


def load_data(file_path):
    with open(file_path, "r") as file:
        return json.load(file)


def extract_number(value):
    if isinstance(value, dict) and "$numberLong" in value:
        return int(value["$numberLong"])
    return value


program_metrics = load_data("714 JSON/sample_cps714module8.program_metrics.json")[0]
rewards = load_data("714 JSON/sample_cps714module8.rewards.json")
support_tickets = load_data("714 JSON/sample_cps714module8.support_tickets.json")

def create_scrollable_frame(root):
    container = tk.Frame(root)
    canvas = tk.Canvas(container, bg="#f4f4f4")
    scrollbar = ttk.Scrollbar(container, orient="vertical", command=canvas.yview)
    scrollable_frame = tk.Frame(canvas, bg="#f4f4f4")

    scrollable_frame.bind(
        "<Configure>",
        lambda e: canvas.configure(scrollregion=canvas.bbox("all"))
    )
    canvas.create_window((0, 0), window=scrollable_frame, anchor="nw")
    canvas.configure(yscrollcommand=scrollbar.set)

    def on_mousewheel(event):
        if event.delta:
            canvas.yview_scroll(-1 * (event.delta // 120), "units")
        elif event.num == 4:
            canvas.yview_scroll(-1, "units")
        elif event.num == 5:
            canvas.yview_scroll(1, "units")

    canvas.bind_all("<MouseWheel>", on_mousewheel)
    canvas.bind_all("<Button-4>", on_mousewheel)
    canvas.bind_all("<Button-5>", on_mousewheel)

    container.pack(fill="both", expand=True)
    canvas.pack(side="left", fill="both", expand=True)
    scrollbar.pack(side="right", fill="y")

    return scrollable_frame


def create_dashboard():
    root = tk.Tk()
    root.title("Reporting and Analytics Module")
    root.geometry("1020x800")
    root.resizable(False, False)
    scrollable_frame = create_scrollable_frame(root)

    # ====== Header Section ======
    header_frame = tk.Frame(scrollable_frame, bg="#4a90e2", pady=20, padx=20)
    header_frame.pack(fill="x", pady=(0, 10))

    header_label = tk.Label(
        header_frame,
        text="Reporting and Analytics Dashboard",
        bg="#4a90e2",
        fg="white",
        font=("Helvetica", 18, "bold"),
    )
    header_label.pack()

    # ====== KPIs Section ======
    kpi_frame = tk.Frame(scrollable_frame, bg="#ffffff", pady=10)
    kpi_frame.pack(fill="x", pady=(10, 20))

    kpi_labels = [
        ("Active Users", extract_number(program_metrics["active_users"])),
        ("New Users", extract_number(program_metrics["new_users"])),
        ("Rewards Redeemed", extract_number(program_metrics["rewards_redeemed"])),
        ("Total Points Distributed", extract_number(program_metrics["points_distributed"])),
    ]

    kpi_inner_frame = tk.Frame(kpi_frame, bg="#ffffff")
    kpi_inner_frame.pack(anchor="center")

    for i, (label, value) in enumerate(kpi_labels):
        kpi_box = tk.Frame(kpi_inner_frame, bg="#4a90e2", padx=10, pady=5, relief="raised", bd=2)
        kpi_box.grid(row=0, column=i, padx=10, pady=5)

        tk.Label(kpi_box, text=label, bg="#4a90e2", fg="white", font=("Helvetica", 12, "bold")).pack()
        tk.Label(kpi_box, text=value, bg="#ffffff", fg="#333", font=("Helvetica", 14, "bold")).pack()

    # ====== Chart Section ======
    chart_frame = tk.Frame(scrollable_frame, bg="#ffffff", pady=10, padx=0, relief="groove", bd=2)
    chart_frame.pack(fill="both", expand=True, pady=(10, 20))

    chart_label = tk.Label(chart_frame, text="Reward Redeem Counts", font=("Helvetica", 14, "bold"), bg="#ffffff")
    chart_label.pack(pady=(0, 10))

    reward_names = [reward["reward_name"] for reward in rewards]
    redeem_counts = [extract_number(reward["redeem_count"]) for reward in rewards]

    fig = Figure(figsize=(10, 6), dpi=100)
    ax = fig.add_subplot(111)

    # Create bar chart
    bar_colors = ["#4a90e2"] * len(reward_names)
    bars = ax.barh(reward_names, redeem_counts, color=bar_colors)


    for bar, count in zip(bars, redeem_counts):
        ax.text(count + 3, bar.get_y() + bar.get_height() / 2,
                str(count), va='center', ha='left', fontsize=10, color="#333")

    ax.set_title("Reward Redeem Counts", fontsize=18, pad=20, color="#333")
    ax.set_xlabel("Redeem Count", fontsize=12, color="#333")
    ax.grid(axis="x", linestyle="--", alpha=0.6)
    ax.tick_params(axis="x", labelsize=10)
    ax.tick_params(axis="y", labelsize=10)
    ax.set_yticks(range(len(reward_names)))
    ax.set_yticklabels(reward_names, fontsize=10, ha="right", rotation=0)

    fig.subplots_adjust(left=0.3, right=0.95, top=0.9, bottom=0.1)

    canvas = FigureCanvasTkAgg(fig, master=chart_frame)
    canvas.draw()
    canvas.get_tk_widget().pack(fill="both", expand=True)

    # ====== Table Section ======
    table_frame = tk.Frame(scrollable_frame, bg="#ffffff", pady=10, padx=20, relief="groove", bd=2)
    table_frame.pack(fill="x", pady=(10, 20))

    tk.Label(table_frame, text="Support Tickets", font=("Helvetica", 14, "bold"), bg="#ffffff").pack(pady=(0, 10))

    columns = ["User ID", "Issue Type", "Resolution Time", "Satisfaction"]
    table = ttk.Treeview(table_frame, columns=columns, show="headings", height=8)

    # Table Styling
    style = ttk.Style()
    style.configure("Treeview", rowheight=30, font=("Helvetica", 12), foreground="#000000")
    style.configure("Treeview.Heading", font=("Helvetica", 12, "bold"), background="#4a90e2",
                    foreground="white")
    style.map("Treeview", background=[("selected", "#4a90e2")],
              foreground=[("selected", "white")])

    for col in columns:
        table.heading(col, text=col, anchor="w")
        table.column(col, anchor="w", width=200)

    table.tag_configure("odd", background="#d9f1ff", foreground="#000000")  # Light blue row
    table.tag_configure("even", background="#ffffff", foreground="#000000")  # White row

    for i, ticket in enumerate(support_tickets):
        row_tag = "odd" if i % 2 == 0 else "even"
        table.insert("", "end", values=(
            ticket["user_id"],
            ticket["issue_type"],
            extract_number(ticket["resolution_time"]),
            extract_number(ticket["satisfaction_rating"])
        ), tags=(row_tag,))

    scrollbar = ttk.Scrollbar(table_frame, orient="vertical", command=table.yview)
    table.configure(yscrollcommand=scrollbar.set)

    table.pack(side="left", fill="both", expand=True, padx=10, pady=10)
    scrollbar.pack(side="right", fill="y")

    # ====== Footer Section ======
    footer_frame = tk.Frame(scrollable_frame, bg="#4a90e2", pady=20, relief="raised", bd=2)
    footer_frame.pack(fill="x", pady=(20, 0))

    footer_label = tk.Label(
        footer_frame,
        text="Reporting and Analytics Dashboard © 2024",
        bg="#4a90e2",
        fg="white",
        font=("Helvetica", 12, "bold"),
    )
    footer_label.pack(side="left", padx=20)

    def export_data():
        try:
            with open("exported_data.json", "w") as f:
                json.dump(support_tickets, f, indent=4)
            messagebox.showinfo("Export Successful", "Data exported to 'exported_data.json'")
        except Exception as e:
            messagebox.showerror("Export Failed", f"Error: {e}")

    export_button = tk.Button(
        footer_frame,
        text="Export Data to JSON",
        command=export_data,
        bg="#4a90e2",
        fg="black",
        font=("Helvetica", 12, "bold"),
        relief="flat",
        bd=0,
        padx=20,
        pady=10,
        highlightbackground="#ffffff",
    )
    export_button.pack(side="right", padx=20)

   # Button Hover
    def on_enter(e):
        export_button['bg'] = "#336699"

    def on_leave(e):
        export_button['bg'] = "#4a90e2"

    export_button.bind("<Enter>", on_enter)
    export_button.bind("<Leave>", on_leave)

    root.mainloop()

if __name__ == "__main__":
    create_dashboard()
